import { PASSWORD_VALIDATION } from '@/constants/auth';

export const emailValidate = () => ({
  required: '아이디는 필수 값입니다.',
});

export const passwordValidate = () => PASSWORD_VALIDATION();

export const passwordConfirmValidate = (password: string) => ({
  required: '비밀번호 확인은 필수 값입니다',
  validate: (value: string) =>
    value === password ? true : '비밀번호가 동일하지 않습니다',
});

export const checkboxValidate = () => ({
  required: '필수입니다',
});
