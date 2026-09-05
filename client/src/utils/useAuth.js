/**
 * useAuth — reads the JWT payload from localStorage session.
 * Roles: ADMIN | INVOICING_USER | CONTACT
 */
export function useAuth() {
  try {
    const raw = localStorage.getItem('um_session');
    if (!raw) return { user: null, role: null, isAdmin: false, isAccountant: false, isContact: false };
    const session = JSON.parse(raw);
    const role = session.role || null;
    return {
      user: session,
      role,
      token: session.token,
      contactId: session.contactId || null,
      isAdmin: role === 'ADMIN',
      isAccountant: role === 'INVOICING_USER',
      isContact: role === 'CONTACT',
    };
  } catch {
    return { user: null, role: null, isAdmin: false, isAccountant: false, isContact: false };
  }
}

export default useAuth;
