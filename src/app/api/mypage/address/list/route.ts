import { createClient } from '@/supabase/client';
import { Address } from '@/types/userAddressType';

const supabase = createClient();

export const fetchAddresses = async (userId: string): Promise<Address[]> => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false });

  if (error) {
    console.error('배송지 목록을 불러올 수 없습니다.', error);
  }

  return data as Address[];
};

export const resetDefaultAddress = async (userId: string) => {
  const { error } = await supabase
    .from('addresses')
    .update({ is_default: false } as Partial<Address>)
    .eq('user_id', userId);

  if (error) {
    console.error('기존 기본 배송지를 해제하는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const setDefaultAddress = async (addressId: string) => {
  const { error } = await supabase
    .from('addresses')
    .update({ is_default: true } as Partial<Address>)
    .eq('id', addressId);

  if (error) {
    console.error('기본 배송지를 설정하는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const deleteAddress = async (id: string) => {
  try {
    const { error } = await supabase.from('addresses').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('배송지 삭제중 오류가 발생했습니다.', error);
    throw error;
  }
};
