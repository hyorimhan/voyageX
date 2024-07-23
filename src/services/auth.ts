import axios from 'axios';

export const signUp = async ({ email, password }: any) => {
  // const response = await axios.post('http://localhost:3000/api/auth/signup', {
  //   email,
  //   password,
  // });
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '회원가입에 실패했습니다');
  }

  return response.json();
};
