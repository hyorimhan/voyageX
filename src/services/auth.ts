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
  const response = await fetch('/api/auth/deleteUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  const responseData = await response.json();

  if (response.ok) {
    toast.success('회원탈퇴가 완료되었습니다.');
  } else {
    toast.error(responseData.error || '회원탈퇴 중 오류가 발생했습니다.');
  }

  return responseData;
};
