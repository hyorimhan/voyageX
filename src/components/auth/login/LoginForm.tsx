'use client';

import { login } from '@/services/auth';
import { formType } from '@/types/authFormType';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { emailValidate, passwordValidate } from '../authValidate';
import useAuthStore from '../../../zustand/store/useAuth';
import Link from 'next/link';
import KakaoLogin from '../kakao/KakaoLogin';

function LoginForm() {
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formType>();

  const loginForm = async (data: formType) => {
    const response = await login(data);

    if (response.error) {
      toast(response.error);
      reset();
      return;
    }

    if (response.message) {
      toast(response.message, {
        icon: '🌠',
      });

      saveUser(response.user);
      // router.replace('/');

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
    <div className='flex flex-col items-end h-screen justify-center'>
      <form onSubmit={handleSubmit(loginForm, handleError)}>
        <div className='text-center text-2xl my-4 text-black-50'>로그인</div>
        <div className='flex flex-col'>
          <label htmlFor='email' className='mb-[4px] text-black-200'>
            이메일 *
          </label>
          <input
            type='email'
            id='email'
            placeholder='예) voyageX@gmail.com'
            {...register('email', emailValidate())}
            className='text-black-900 w-[469px] h-[60px]   rounded-lg p-2 '
            autoFocus
          />
        </div>

        <div className='flex flex-col mt-4'>
          <label htmlFor='password' className='mb-[4px] text-black-200'>
            비밀번호 *
          </label>
          <input
            type='password'
            id='password'
            placeholder='영문, 숫자, 특수문자 조합 8-16자'
            {...register('password', passwordValidate())}
            className='text-black-900 w-[469px] h-[60px]   rounded-lg p-2 '
          />
        </div>
        <div className='flex flex-col'>
          <button
            type='submit'
            className='bg-primary-600 w-[469px] h-[60px]  rounded-lg p-2 mt-5 text-black-50'
          >
            로그인
          </button>
          <Link
            href={'/signup'}
            className='bg-primary-100 w-[469px] h-[60px] rounded-lg p-2 mt-3 flex justify-center items-center text-primary-600'
          >
            이메일로 회원가입
          </Link>
        </div>
        <div className='flex items-center mt-10'>
          <div className='flex-1 border-b-[0.5px] border-white' />
          <div className='px-4 text-black-50'>
            SNS계정으로 간편 로그인/회원가입
          </div>
          <div className='flex-1 border-b-[0.5px] border-white' />
        </div>
      </form>
      <KakaoLogin />
    </div>
  );
}

export default LoginForm;
