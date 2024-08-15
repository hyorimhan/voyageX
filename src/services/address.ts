import axios from 'axios';
import { Address } from '@/types/userAddressType';

export const fetchAddresses = async (userId: string): Promise<Address[]> => {
  const response = await axios.get(`/api/mypage/addresses/user/${userId}`);
  return response.data;
};

export const addAddress = async ({
  userId,
  address,
}: {
  userId: string;
  address: Partial<Address>;
}): Promise<Address[]> => {
  const response = await axios.post(`/api/mypage/addresses/user/${userId}`, {
    userId,
    address,
  });
  return response.data;
};

export const updateAddress = async ({
  addressId,
  address,
}: {
  addressId: string;
  address: Partial<Address>;
}): Promise<Address[]> => {
  const response = await axios.patch(
    `/api/mypage/addresses/address/${addressId}`,
    {
      address,
    },
  );
  return response.data;
};

export const deleteAddress = async (addressId: string) => {
  const response = await axios.delete(
    `/api/mypage/addresses/address/${addressId}`,
  );
  return response.data;
};

export const resetDefaultAddress = async (userId: string): Promise<void> => {
  await axios.put(`/api/mypage/addresses/reset_default`, { userId });
};

export const setDefaultAddress = async (addressId: string): Promise<void> => {
  await axios.put(`/api/mypage/addresses/set_default`, { addressId });
};

export const getDefaultAddress = async (user_id: string) => {
  const response = await axios.get(
    `/api/mypage/addresses/address/default/${user_id}`,
  );
  return response.data;
};
