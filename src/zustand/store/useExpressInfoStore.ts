import { Address } from '@/types/userAddressType';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

type ExpressAddressType = {
  expressAddress: Address | null;
  setExpressAddress: (expressAddress: Address | null) => void;
};

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_KEY!;

const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const customStorage = createJSONStorage<ExpressAddressType>(() => ({
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

const useExpressInfoStore = create<ExpressAddressType>()(
  persist(
    (set) => ({
      expressAddress: null,
      setExpressAddress: (expressAddress) => set({ expressAddress }),
    }),
    {
      name: 'expressInfo',
      storage: customStorage,
    },
  ),
);

export default useExpressInfoStore;
