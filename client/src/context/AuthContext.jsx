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
import { initMockUserStore, getMockUsers, setMockUsers } from "../data/mockUsers";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, loginId, email, name, role }
  const [loading, setLoading] = useState(true);

  // On mount: seed mock store & restore session
  useEffect(() => {
    initMockUserStore();
    const session = localStorage.getItem("um_session");
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  /**
   * login — validate credentials against the mock store.
   * BACKEND SWAP: Replace body with a real POST to /api/auth/login
   * @returns {{ success: boolean, error?: string }}
   */
  const login = (loginId, password, role) => {
    const users = getMockUsers();
    const found = users.find(
      (u) => u.loginId === loginId && u.password === password
    );

    if (!found) {
      return { success: false, error: "Invalid Login ID or Password" };
    }
    if (role && found.role !== role) {
      return { success: false, error: `This account does not have the "${role}" role.` };
    }

    const session = { id: found.id, loginId: found.loginId, email: found.email, name: found.name, role: found.role };
    localStorage.setItem("um_session", JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  /**
   * register — create a new user in the mock store.
   * BACKEND SWAP: Replace body with a real POST to /api/auth/register
   * @returns {{ success: boolean, error?: string }}
   */
  const register = (loginId, email, password, name, role = "Accountant") => {
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

    const users = getMockUsers();

    if (users.find((u) => u.loginId === loginId)) {
      return { success: false, field: "loginId", error: "Login ID is already taken." };
    }
    if (users.find((u) => u.email === email)) {
      return { success: false, field: "email", error: "Email is already registered." };
    }

    const newUser = {
      id: `u${Date.now()}`,
      loginId,
      email,
      password,
      name: name || loginId,
      role,
    };

    setMockUsers([...users, newUser]);

    const session = { id: newUser.id, loginId: newUser.loginId, email: newUser.email, name: newUser.name, role: newUser.role };
    localStorage.setItem("um_session", JSON.stringify(session));
    setUser(session);
    return { success: true };
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
