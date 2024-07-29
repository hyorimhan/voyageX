import { createClient } from '@/supabase/client';
import { formType } from '@/types/authFormType';
import toast from 'react-hot-toast';

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
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (data) {
    toast.success('로그인 되었습니다');
  }
  if (error) {
    toast.error(error.message);
  }
};

// 구글
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (data) {
    toast.success('로그인 되었습니다');
  }
  if (error) {
    toast.error(error.message);
  }
};

// 현재 로그인 유저 정보
export const userLoginInfo = async () => {
  const { data: loginInfo } = await supabase.auth.getUser();
  return loginInfo;
};

export const updatePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
) => {
  try {
    // 현재 비밀번호로 로그인 시도
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });

    if (signInError) {
      console.error('Sign-in error:', signInError);
      return { error: { message: '현재 비밀번호가 올바르지 않습니다.' } };
    }

    // 비밀번호 변경
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      console.error('Update password error:', updateError);
      return { error: { message: '비밀번호 변경에 실패했습니다.' } };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: { message: '비밀번호 변경 중 오류가 발생했습니다.' } };
  }
};
