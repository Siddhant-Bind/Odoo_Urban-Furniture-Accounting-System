/**
 * MOCK DATA — Users
 * ─────────────────────────────────────────────────────────────────────────────
 * When the backend is ready, DELETE this file and replace all imports of
 * `mockUsers` with real API calls (e.g. POST /api/auth/register,
 * POST /api/auth/login, GET /api/users).
 *
 * This file also seeds the localStorage "database" on first load.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SEED_USERS = [
  {
    id: "u001",
    loginId: "admin01",
    email: "admin@urbanmart.com",
    // plain-text only for mock; real impl should hash
    password: "Admin@1234",
    name: "Alex Morgan",
    role: "Admin",
  },
  {
    id: "u002",
    loginId: "acc001",
    email: "accountant@urbanmart.com",
    password: "Acc@12345",
    name: "Priya Sharma",
    role: "Accountant",
  },
];

/**
 * Initialise the mock user store in localStorage with seed data if empty.
 * Call this once at app startup (e.g. in main.jsx or AuthContext).
 */
export function initMockUserStore() {
  const existing = localStorage.getItem("um_users");
  if (!existing) {
    localStorage.setItem("um_users", JSON.stringify(SEED_USERS));
  }
}

/** Returns all users from the mock store. */
export function getMockUsers() {
  return JSON.parse(localStorage.getItem("um_users") || "[]");
}

/** Persist updated user list back to the store. */
export function setMockUsers(users) {
  localStorage.setItem("um_users", JSON.stringify(users));
}
