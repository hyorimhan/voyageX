import axios from 'axios';

export const getGoods = async (order: string) => {
  const response = await axios.get(`/api/goods?order=${order}`);
  return response.data;
};
