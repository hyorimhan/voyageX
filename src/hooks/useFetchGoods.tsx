import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

interface Goods {
  id: number;
  goods_img: string;
  goods_name: string;
  goods_price: number;
  rating_avg: number;
  like_count: number;
  discount: number;
  pre_price: number;
}

const fetchGoods = async (): Promise<Goods[]> => {
  const { data } = await axios.get('/api/goods');
  return data;
};

const useFetchGoods = (): UseQueryResult<Goods[], Error> => {
  return useQuery<Goods[], Error>({
    queryKey: ['goods'],
    queryFn: fetchGoods,
  });
};

export default useFetchGoods;