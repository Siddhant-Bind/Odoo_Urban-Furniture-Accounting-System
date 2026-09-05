/**
 * AuthContext — Global authentication state
 * ─────────────────────────────────────────────────────────────────────────────
 * BACKEND SWAP GUIDE:
 *   1. Replace `loginUser()` body with: fetch('/api/auth/login', { method:'POST', body: JSON.stringify({loginId, password}) })
 *   2. Replace `registerUser()` body with: fetch('/api/auth/register', { method:'POST', ... })
 *   3. Replace localStorage session with JWT/cookie from response
 *   4. Remove the import of mockUsers helpers once real DB is connected
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchClient } from "../utils/api";
import { jwtDecode } from "jwt-decode"; // we will need to npm install this, or we can just base64 decode it manually. Wait, I should just decode it manually to avoid adding dependencies, or assume the backend sends the user object along with the token.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, loginId, email, name, role, token }
  const [loading, setLoading] = useState(true);

  // On mount: restore session
  useEffect(() => {
    const session = localStorage.getItem("um_session");
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        localStorage.removeItem("um_session");
      }
    }
    setLoading(false);
  }, []);

  /**
   * login — validate credentials against the backend API.
   * @returns {{ success: boolean, error?: string }}
   */
  const login = async (loginId, password, role) => {
    try {
      // API call to /auth/login
      const data = await fetchClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({ loginId, password }),
      });

      // The backend returns: { token: '...', user: { id, loginId, role, ... } }
      // Wait, let's verify what the backend returns. In auth.controller.js, it usually returns { token, user: { id, loginId, role } }.
      // If role is passed from the form, we should check it.
      if (role) {
        const expectedRole = role === "Admin" ? "ADMIN" : "INVOICING_USER";
        if (data.user.role !== expectedRole && !(role === "Accountant" && data.user.role === "ACCOUNTANT")) {
          return { success: false, error: `This account does not have the "${role}" role.` };
        }
      }

      const session = { ...data.user, token: data.token };
      localStorage.setItem("um_session", JSON.stringify(session));
      setUser(session);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "Invalid Login ID or Password" };
    }
  };

  /**
   * register — create a new user via the backend API.
   * @returns {{ success: boolean, error?: string }}
   */
  const register = async (loginId, email, password, name, role = "Accountant") => {
    // Validation
    if (loginId.length < 6 || loginId.length > 12) {
      return { success: false, field: "loginId", error: "Login ID must be 6–12 characters." };
    }
    if (!/^[a-zA-Z0-9]+$/.test(loginId)) {
      return { success: false, field: "loginId", error: "Login ID must be letters and numbers only." };
    }
    if (password.length <= 8) {
      return { success: false, field: "password", error: "Password must be more than 8 characters." };
    }
    if (!/[a-z]/.test(password)) {
      return { success: false, field: "password", error: "Password must contain at least one lowercase letter." };
    }
    if (!/[A-Z]/.test(password)) {
      return { success: false, field: "password", error: "Password must contain at least one uppercase letter." };
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return { success: false, field: "password", error: "Password must contain at least one special character." };
    }

    try {
      const data = await fetchClient("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ loginId, email, password, name, role }),
      });

      // The backend returns: { token, user: { ... } }
      const session = { ...data.user, token: data.token };
      localStorage.setItem("um_session", JSON.stringify(session));
      setUser(session);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "Registration failed" };
    }
  };

  /** logout — clear session and redirect caller to /login */
  const logout = () => {
    localStorage.removeItem("um_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
