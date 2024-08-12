import axios from 'axios';

export const getLikeLength = async (user_id: string) => {
  const response = await axios.get(`/api/mypage/recommend/${user_id}`);
  return response.data;
};
