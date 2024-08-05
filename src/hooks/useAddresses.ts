import {
  addAddress,
  fetchAddresses,
  updateAddress,
  deleteAddress,
  resetDefaultAddress,
  setDefaultAddress,
} from '@/services/address';
import { Address } from '@/types/userAddressType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 주소 목록을 가져오는 hook
export const useFetchAddresses = (userId: string | null) => {
  return useQuery<Address[]>({
    queryKey: ['addresses', userId],
    queryFn: () => fetchAddresses(userId || ''),
  });
};

// 주소를 추가하는 hook
export const useAddAddress = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user_id] });
    },
  });
};

// 주소를 업데이트하는 hook
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      addressId,
      address,
    }: {
      addressId: string;
      address: Partial<Address>;
    }) => updateAddress(addressId, address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// // 주소를 삭제하는 hook
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// 기본 주소를 리셋하는 hook
export const useResetDefaultAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => resetDefaultAddress(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};
// 기본 주소를 설정하는 hook
export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (addressId: string) => setDefaultAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};
