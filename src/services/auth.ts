import { createClient } from '@/supabase/client';
import { formType } from '@/types/authFormType';

const supabase = createClient();

// 회원가입
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

// 로그인
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

// 로그아웃
export const logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'DELETE',
  });
  const responseData = await response.json();
  return responseData;
};

// 카카오
export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });
  return { data, error };
};

// 현재 로그인 유저 정보
export const userLoginInfo = async () => {
  const { data: loginInfo } = await supabase.auth.getUser();
  return loginInfo;
};
