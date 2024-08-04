import { fetchAddresses } from '@/services/address';
import { Address } from '@/types/userAddressType';
import { useQuery } from '@tanstack/react-query';

export const useFetchAddresses = (userId: string | null) => {
  return useQuery<Address[]>({
    queryKey: ['addresses', userId],
    queryFn: () => fetchAddresses(userId || ''),
  });
};
