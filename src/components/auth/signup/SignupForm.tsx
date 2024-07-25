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
      <div className='flex flex-col items-end '>
        <div>회원가입</div>

        <form onSubmit={handleSubmit(joinForm, handleError)}>
          <div className='flex flex-col'>
            <label htmlFor='email'>이메일*</label>
            <input
              id='email'
              type='email'
              placeholder='예) voyageX@gmail.com'
              {...register('email', emailValidate())}
              className='text-black-900 w-[500px] h-16  rounded-lg p-2 '
            />
          </div>

          <div className='flex flex-col mt-4'>
            <label htmlFor='password'>비밀번호*</label>
            <input
              id='password'
              type='password'
              placeholder='영문, 숫자, 특수문자 조합 8-16자'
              {...register('password', passwordValidate())}
              className='text-black-900 w-[500px] h-16  rounded-lg p-2'
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
              className='text-black-900 w-[500px] h-16 rounded-lg p-2'
            />
          </div>
          <div>전체동의</div>
          <div className='flex flex-row'>
            <input type='checkbox' id='checkbox' />
            <label htmlFor='checkbox'> 만 14세 이상입니다</label>
          </div>
          <button
            type='submit'
            className='bg-purple-300 w-[500px] h-16 rounded-lg p-2'
          >
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
