import { getAddressList } from '@/services/address';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

export const useGetAddressList = (user_id: string) => {
  return useQuery<Tables<'addresses'>[]>({
    queryKey: ['address', user_id],
    queryFn: () => getAddressList(user_id),
  });
};
