import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';
import { Customer } from '@/types/userAddressType';

type CustomerInfoType = {
  customerInfo: Customer | null;
  setCustomerInfo: (customerInfo: Customer | null) => void;
};

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_KEY!;

const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const customStorage = createJSONStorage<CustomerInfoType>(() => ({
  getItem: (name) => {
    const item = sessionStorage.getItem(name);
    if (!item) return null;
    const decryptedItem = decrypt(item);
    return JSON.parse(decryptedItem);
  },
  setItem: (name, value) =>
    sessionStorage.setItem(name, encrypt(JSON.stringify(value))),
  removeItem: (name) => sessionStorage.removeItem(name),
}));

const useCustomerInfoStore = create<CustomerInfoType>()(
  persist(
    (set) => ({
      customerInfo: null,
      setCustomerInfo: (customerInfo) => set({ customerInfo }),
    }),
    {
      name: 'customerInfo',
      storage: customStorage,
    },
  ),
);

export default useCustomerInfoStore;
