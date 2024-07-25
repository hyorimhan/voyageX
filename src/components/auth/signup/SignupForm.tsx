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

function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formType>();

  const password = useWatch({
    control,
    name: 'password',
  });

  const joinForm = async (data: formType) => {
    const response = await signUp(data);
    console.log(response);
    if (response.message) {
      toast(response.message, {
        icon: '🌠',
      });
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
  };

  return (
    <>
      <div>
        <div>회원가입</div>
        <form
          onSubmit={handleSubmit(joinForm, handleError)}
          className='flex flex-col items-end'
        >
          <div>
            <label htmlFor='email' className='flex'>
              이메일*
            </label>
            <input
              id='email'
              type='email'
              placeholder='email@email.com'
              {...register('email', emailValidate())}
              className='text-black-900'
            />
          </div>

          <label htmlFor='password'>비밀번호*</label>
          <input
            id='password'
            type='password'
            {...register('password', passwordValidate())}
            className='text-black-900'
          />

          <label htmlFor='passwordConfirm'>비밀번호 확인*</label>
          <input
            id='passwordConfirm'
            type='password'
            {...register('passwordConfirm', passwordConfirmValidate(password))}
            className='text-black-900'
          />
          <button type='submit'>회원가입</button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
