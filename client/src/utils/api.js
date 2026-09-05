export const API_BASE_URL = 'http://localhost:5000/api';

export const fetchClient = async (endpoint, options = {}) => {
  const session = localStorage.getItem('um_session');
  let token = null;
  if (session) {
    try {
      const parsed = JSON.parse(session);
      token = parsed.token;
    } catch (e) {
      console.error('Failed to parse session:', e);
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};
