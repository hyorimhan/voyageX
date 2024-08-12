'use client';
import { useForm, useWatch, FieldErrors } from 'react-hook-form';
import { formType } from '@/types/authFormType';
import { signUp } from '@/services/auth';
import {
  emailValidate,
  passwordConfirmValidate,
  passwordValidate,
} from '@/components/auth/AuthValidate';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SignupCheckbox from './SignupCheckbox';
import { orbitron } from '../../../../public/fonts/orbitron';
import EyeOnIcon24px from '@/components/common/icons/24px/EyeOnIcon24px';
import EyeOffIcon24px from '@/components/common/icons/24px/EyeOffIcon24px';

function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<formType>({
    mode: 'onChange',
    defaultValues: {
      showPassword: false,
      showPasswordConfirm: false,
    },
  });

  const password = useWatch({
    control,
    name: 'password',
  });

  const showPassword = useWatch({
    control,
    name: 'showPassword',
    defaultValue: false,
  });

  const showPasswordConfirm = useWatch({
    control,
    name: 'showPasswordConfirm',
    defaultValue: false,
  });

  // const [age14, terms, privacy] = useWatch({
  //   control,
  //   name: ['age14', 'terms', 'privacy'],
  // });

  const joinForm = async (data: formType) => {
    const response = await signUp(data);

    console.log('Response from signUp:', response);
    if (response.message) {
      toast.success(response.message);
      router.replace('/login');
    }
  };

  const handleError = (errors: FieldErrors<formType>) => {
    if (errors.email?.message) {
      toast.error(errors.email.message);
    }

    if (errors.password?.message) {
      toast.error(errors.password.message);
    }

    if (errors.passwordConfirm?.message) {
      toast.error(errors.passwordConfirm.message);
    }

    if (
      errors.age14?.message ||
      errors.terms?.message ||
      errors.privacy?.message
    ) {
      toast.error('모든 체크박스를 선택해주세요');
    }
  };

  return (
    <>
      <div className='flex flex-col items-end justify-center '>
        <form onSubmit={handleSubmit(joinForm, handleError)}>
          <div className={`text-center text-2xl my-4 ${orbitron.className}`}>
            sign up
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-1 text-black-200'>
              이메일 *
            </label>
            <input
              id='email'
              type='email'
              placeholder='예) voyageX@gmail.com'
              {...register('email', emailValidate())}
              className='text-black-900 w-[473px] h-[58px]  sm:w-[335px] rounded-lg p-2 '
              autoFocus
            />
            {errors.email && (
              <p className='text-error-900 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='flex flex-col mt-4'>
            <label htmlFor='password' className='mb-1 text-black-200'>
              비밀번호 *
            </label>
            <div className='relative'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='영문, 숫자, 특수문자 조합 8-16자'
                {...register('password', passwordValidate())}
                className='text-black-900 w-[473px] h-[58px]  sm:w-[335px]  rounded-lg p-2'
              />
              <button
                type='button'
                onClick={() => setValue('showPassword', !showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2'
              >
                {showPassword ? <EyeOnIcon24px /> : <EyeOffIcon24px />}
              </button>
            </div>
            {errors.password && (
              <p className='text-error-900 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className='flex flex-col my-3 mb-6'>
            <label htmlFor='passwordConfirm'></label>
            <div className='relative'>
              <input
                id='passwordConfirm'
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder='비밀번호를 다시 한번 입력해주세요'
                {...register(
                  'passwordConfirm',
                  passwordConfirmValidate(password),
                )}
                className='text-black-900 w-[473px] h-[58px]  sm:w-[335px]  rounded-lg p-2'
              />
              <button
                type='button'
                onClick={() =>
                  setValue('showPasswordConfirm', !showPasswordConfirm)
                }
                className='absolute right-3 top-1/2 transform -translate-y-1/2'
              >
                {showPasswordConfirm ? <EyeOnIcon24px /> : <EyeOffIcon24px />}
              </button>
              {errors.passwordConfirm && (
                <p className='text-error-900 text-sm mt-1 absolute '>
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <SignupCheckbox
              control={control}
              setValue={setValue}
              register={register}
            />
          </div>
          <button
            type='submit'
            // disabled={!isValid}
            className={`bg-primary-600 w-[473px] h-[58px]  sm:w-[335px] rounded-lg p-2 mt-5 `}
          >
            가입하기
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
