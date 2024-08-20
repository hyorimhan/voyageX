import { createClient } from '@/supabase/client';
import { formType } from '@/types/authFormType';
import axios from 'axios';
import toast from 'react-hot-toast';

const supabase = createClient();

// 회원가입
export const signUp = async ({ email, password }: formType) => {
  const response = await axios.post('/api/auth/signup', { email, password });
  return response.data;
};

// 로그인
export const login = async ({ email, password }: formType) => {
  const response = await axios.post('/api/auth/login', { email, password });
  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await axios.delete('/api/auth/logout');
  return response.data;
};

// 카카오
export const signInWithKakao = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'login',
      },
      redirectTo: `${window.location.origin}/api/auth/kakao`,
    },
  });

  if (error) {
    toast.error(error.message);
  }
};

// 구글
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
      },
      redirectTo: `${window.location.origin}/api/auth/google`,
    },
  });

  if (error) {
    toast.error(error.message);
  }
};

// 현재 로그인 유저 정보
export const userLoginInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// 비밀번호 변경
export const updatePassword = async ({
  email,
  currentPassword,
  newPassword,
}: {
  email: string;
  currentPassword: string;
  newPassword: string;
}): Promise<{ error?: { field: string; message: string } }> => {
  try {
    // 현재 비밀번호로 로그인 시도
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });

    if (signInError) {
      return {
        error: {
          field: 'currentPassword',
          message: '현재 비밀번호가 일치하지 않습니다.',
        },
      };
    }

    // 비밀번호 변경
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return {
        error: {
          field: 'currentPassword',
          message: '현재 비밀번호가 일치하지 않습니다.',
        },
      };
    }

    return {};
  } catch (error) {
    return {
      error: {
        field: 'unexpected',
        message: '비밀번호 변경 중 오류가 발생했습니다.',
      },
    };
  }
};

// 회원 탈퇴
export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.post('/api/auth/deleteUser', { userId });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data.console.error ||
          '회원 탈퇴 중 오류가 발생했습니다',
      );
    } else {
      toast.error('알 수 없는 오류가 발생했습니다');
    }
    throw error;
  }
};
