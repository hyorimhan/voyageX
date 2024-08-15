'use client';

import { login } from '@/services/auth';
import { formType } from '@/types/authFormType';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuthStore from '../../../zustand/store/useAuth';
import Link from 'next/link';
import GoogleKakao from './GoogleKakao';
import { emailValidate, passwordValidate } from '../AuthValidate';
import EyeOffIcon24px from '../../common/icons/24px/EyeOffIcon24px';
import EyeOnIcon24px from '@/components/common/icons/24px/EyeOnIcon24px';
import { orbitron } from '../../../../public/fonts/orbitron';

function LoginForm() {
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<formType>({
    mode: 'onChange',
    defaultValues: {
      showPassword: false,
    },
  });

  const showPassword = useWatch({
    control,
    name: 'showPassword',
    defaultValue: false,
  });

  const loginForm = async (data: formType) => {
    const response = await login(data);

    if (response.error) {
      toast.error(response.error);
      reset();
      return;
    }

    if (response.message) {
      toast.success(response.message);

      saveUser(response.user);
      router.replace('/');

      return;
    }
  };

  return (
    <div className='flex flex-col items-end justify-center'>
      <form onSubmit={handleSubmit(loginForm)}>
        <div
          className={`text-center text-2xl font-medium my-4 ${orbitron.className} `}
        >
          LOG IN
        </div>
        <div className='flex flex-col'>
          <label htmlFor='email' className='mb-1 text-black-300'>
            이메일 *
          </label>
          <input
            type='email'
            id='email'
            placeholder='예) voyageX@gmail.com'
            {...register('email', emailValidate())}
            className={`text-black-900  w-[473px] h-[58px]  sm:w-[335px] rounded-lg p-6 border-2  ${
              errors.email ? 'border-error-900 focus:border-error-900' : ''
            }  `}
            autoFocus
          />
          {errors.email && (
            <p className='text-error-900 text-sm mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='flex flex-col mt-4 '>
          <label htmlFor='password' className='mb-1 text-black-300'>
            비밀번호 *
          </label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='영문, 숫자, 특수문자 조합 8-16자'
              {...register('password', passwordValidate())}
              className={`text-black-900  w-[473px] h-[58px] sm:w-[335px]  border-2 rounded-lg p-6 ${
                errors.password ? 'border-error-900 focus:border-error-900' : ''
              }`}
            />
            <button
              type='button'
              onClick={() => setValue('showPassword', !showPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
            >
              {showPassword ? <EyeOnIcon24px /> : <EyeOffIcon24px />}
            </button>
            {errors.password && (
              <p className='text-error-900 text-sm mt-1 absolute'>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col'>
          <button
            type='submit'
            // disabled={!isValid}
            className={
              ' w-[473px] h-[58px] sm:w-[335px] font-semibold  rounded-lg p-2 mt-8 bg-primary-600 '
            }
            // ${!isValid ? 'cursor-not-allowed bg-black-400' : 'bg-primary-600'}
          >
            로그인
          </button>
          <Link
            href={'/signup'}
            className='bg-primary-100  w-[473px] h-[58px]  font-semibold sm:w-[335px] rounded-lg p-2 mt-3 flex justify-center items-center text-primary-700'
          >
            이메일로 회원가입
          </Link>
        </div>
        <div className='flex items-center mt-10'>
          <div className='flex-1 border-b border-white' />
          <div className='px-4 '>SNS계정으로 간편 로그인/회원가입</div>
          <div className='flex-1 border-b border-white' />
        </div>
      </form>
      <div className='flex mt-4 justify-center w-full max-w-[473px]'>
        <GoogleKakao />
      </div>
    </div>
  );
}

export default LoginForm;
