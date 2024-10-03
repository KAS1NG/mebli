export const defaultHeaders = (token: string | null) => ({
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  });