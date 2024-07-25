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
      <form
        onSubmit={handleSubmit(joinForm, handleError)}
        className='text-center flex flex-col justify-center '
      >
        <label htmlFor='email'>이메일</label>
        <input
          id='email'
          type='email'
          placeholder='email@email.com'
          {...register('email', emailValidate())}
        />

        <label htmlFor='password'>비밀번호</label>
        <input
          id='password'
          type='password'
          {...register('password', passwordValidate())}
        />

        <label htmlFor='passwordConfirm'>비밀번호 확인</label>
        <input
          id='passwordConfirm'
          type='password'
          {...register('passwordConfirm', passwordConfirmValidate(password))}
        />
        <button type='submit'>회원가입</button>
      </form>
    </>
  );
}

export default SignupForm;
