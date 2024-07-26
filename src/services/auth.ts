import { createClient } from '@/supabase/client';
import { formType } from '@/types/authFormType';

const supabase = createClient();

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
    headers: {
      'Content-Type': 'application/json',
    },
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

export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });
  return { data, error };
};

export const userLoginInfo = async () => {
  const { data: loginInfo } = await supabase.auth.getUser();
  return loginInfo;
};

export const updatePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
) => {
  // 현재 비밀번호로 로그인 시도
  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

  if (signInError) {
    return { error: { message: '현재 비밀번호가 올바르지 않습니다.' } };
  }

  // 비밀번호 변경
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: { message: '비밀번호 변경에 실패했습니다.' } };
  }

  return { error: null };
};
