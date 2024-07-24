import { formType } from '@/types/authFormType';

export const signUp = async ({ email, password }: formType) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseData = await response.json();
  return responseData;
};

export const login = async ({ email, password }: formType) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const responseData = await response.json();
  return responseData;
};

export const logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'DELETE',
  });
  const responseData = await response.json();
  return responseData;
};
