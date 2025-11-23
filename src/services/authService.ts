import api from './api';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post('/auth/login', { email, password });
  console.log(response.data)
  const { access_token, user } = response.data;
  localStorage.setItem('jwt_token', access_token);
  localStorage.setItem('user', JSON.stringify(user));
  return { user, access_token };
}

export async function getMe(): Promise<User> {
  const response = await api.get('/me');
  return response.data;
}

export async function register(
  email: string,
  first_name: string,
  last_name: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post('/auth/register', {
    email,
    first_name,
    last_name,
    password,
  });
  const { access_token, user } = response.data;
  localStorage.setItem('jwt_token', access_token);
  localStorage.setItem('user', JSON.stringify(user));
  return { user, access_token };
}