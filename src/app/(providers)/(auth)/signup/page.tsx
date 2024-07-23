'use client';

import { useForm, useWatch } from 'react-hook-form';
import { formType } from '@/types/authFormType';
import { signUp } from '@/services/auth';

const SignUpPage = () => {
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
      // 응답의 메시지를 확인하여 처리
      alert(response.message);
    }
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(joinForm)}>
        <label htmlFor='email'>이메일</label>
        <input
          id='email'
          type='email'
          placeholder='email@email.com'
          {...register('email', {
            required: '필수 값입니다.',
            minLength: {
              value: 6,
              message: '최소 6자 이상 입력해주세요',
            },
            setValueAs: (value) => value.trim(),
          })}
        />

        <label htmlFor='password'>비밀번호</label>
        <input id='password' type='password' {...register('password')} />

        <label htmlFor='passwordConfirm'>비밀번호 확인</label>
        <input
          id='passwordConfirm'
          type='password'
          {...register('passwordConfirm', {
            required: '필수 값입니다',
            validate: (value) =>
              value === password ? true : '비밀번호를 다시 입력해주세요',
          })}
        />
        <button type='submit'>회원가입</button>
      </form>
      {errors.email?.message}
      {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
    </>
  );
};

export default SignUpPage;
