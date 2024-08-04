export const PASSWORD_VALIDATION = () => ({
  required: '비밀번호는 필수 값입니다.',
  minLength: {
    value: 6,
    message: '비밀번호는 최소 8자 이상 입력해주세요',
  },
  maxLength: {
    value: 16,
    message: '비밀번호는 최대 16자까지 입력 가능합니다',
  },
});
