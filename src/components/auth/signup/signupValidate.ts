export const emailValidate = () => ({
  required: '필수 값입니다.',
});

export const passwordValidate = () => ({
  required: '필수 값입니다.',
  minLength: {
    value: 6,
    message: '비밀번호는 최소 6자 이상 입력해주세요',
  },
  maxLenth: {
    value: 15,
    message: '비밀번호는 최대 15자까지 입력 가능합니다',
  },
});

export const passwordConfirmValidate = (password: string) => ({
  required: '필수 값입니다',
  validate: (value: string) =>
    value === password
      ? true
      : '비밀번호, 비밀번호 확인 값을 다시 입력해주세요',
});
