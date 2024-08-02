import axios from 'axios';

export const getAddressList = async (user_id: string) => {
  const response = await axios.get(`/api/address/${user_id}`);
  return response.data;
};
