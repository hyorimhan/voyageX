import { getGoods } from '@/services/goods';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderedGoods = (order: string) => {
  return useQuery<Tables<'goods'>[]>({
    queryKey: ['goods', { order }],
    queryFn: () => getGoods(order),
  });
};
