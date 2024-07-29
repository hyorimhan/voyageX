export const emailValidate = () => ({
  required: '아이디는 필수 값입니다.',
});

export const passwordValidate = () => ({
  required: '비밀번호는 필수 값입니다.',
  minLength: {
    value: 6,
    message: '비밀번호는 최소 8자 이상 입력해주세요',
  },
  maxLenth: {
    value: 16,
    message: '비밀번호는 최대 16자까지 입력 가능합니다',
  },
});

export const passwordConfirmValidate = (password: string) => ({
  required: '비밀번호 확인은 필수 값입니다',
  validate: (value: string) =>
    value === password
      ? true
      : '비밀번호, 비밀번호 확인 값을 다시 입력해주세요',
});

export const checkboxValidate = () => ({
  required: '필수입니다',
});
