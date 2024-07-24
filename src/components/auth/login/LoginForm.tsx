'use client';

import { login } from '@/services/auth';
import { formType } from '@/types/authFormType';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { emailValidate, passwordValidate } from '../authValidate';
import useAuthStore from '../../../zustand/store/useAuth';

function LoginForm() {
  const router = useRouter();
  const userInfo = useAuthStore((state) => state.userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>();

  const loginForm = async (data: formType) => {
    const response = await login(data);

    if (response.message) {
      toast(response.message, {
        icon: '🌠',
      });
      userInfo(response.user);
      router.replace('/');
      return;
    }
  };

  const handleError = (errors: FieldErrors<formType>) => {
    if (errors.email?.message) {
      toast.error(errors.email.message);
    }

    if (errors.password?.message) {
      toast.error(errors.password.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(loginForm, handleError)}>
      <label htmlFor='email'>이메일</label>
      <input
        type='email'
        id='email'
        placeholder='email@email.com'
        {...register('email', emailValidate())}
      />

      <label htmlFor='password'>비밀번호</label>
      <input
        type='password'
        id='password'
        {...register('password', passwordValidate())}
      />
      <button type='submit'>로그인</button>
    </form>
  );
}

export default LoginForm;
