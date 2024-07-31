import { Address } from '@/types/userAddressType';
import { fetchAddresses } from '@/app/api/mypage/address/list/route';
import { useQuery } from '@tanstack/react-query';

export const useFetchAddresses = (userId: string | null) => {
  return useQuery<Address[]>({
    queryKey: ['addresses', userId],
    queryFn: () => fetchAddresses(userId || ''),
  });
};
