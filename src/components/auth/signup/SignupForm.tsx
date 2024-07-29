'use client';
import { useForm, useWatch, FieldErrors } from 'react-hook-form';
import { formType } from '@/types/authFormType';
import { signUp } from '@/services/auth';
import {
  emailValidate,
  passwordConfirmValidate,
  passwordValidate,
} from '@/components/auth/authValidate';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SignupCheckbox from './SignupCheckbox';

function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<formType>();

  const password = useWatch({
    control,
    name: 'password',
  });

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
      <div className='flex flex-col items-end justify-center h-screen'>
        <form onSubmit={handleSubmit(joinForm, handleError)}>
          <div className='text-center text-2xl my-4 text-black-50'>
            회원가입
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-[4px] text-black-200'>
              이메일 *
            </label>
            <input
              id='email'
              type='email'
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
              id='password'
              type='password'
              placeholder='영문, 숫자, 특수문자 조합 8-16자'
              {...register('password', passwordValidate())}
              className='text-black-900 w-[469px] h-[60px]  rounded-lg p-2'
            />
          </div>
          <div className='flex flex-col my-3'>
            <label htmlFor='passwordConfirm'></label>
            <input
              id='passwordConfirm'
              type='password'
              placeholder='비밀번호를 다시 한번 입력해주세요'
              {...register(
                'passwordConfirm',
                passwordConfirmValidate(password),
              )}
              className='text-black-900 w-[469px] h-[60px]  rounded-lg p-2'
            />
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
            className='bg-primary-600 w-[469px] h-[60px]  rounded-lg p-2 mt-5'
          >
            가입하기
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
