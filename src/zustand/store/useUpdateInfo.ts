import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import CryptoJS, { enc } from 'crypto-js';

type userInfo = {
  updateInfo: {
    name: string;
    phone: string;
    email: string;
  } | null;
  setUpdateInfo: (info: { name: string; phone: string; email: string }) => void;
};

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_KEY!;

const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const customStorage = createJSONStorage<userInfo>(() => ({
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

const useUpdateInfoStore = create<userInfo>()(
  persist(
    (set) => ({
      updateInfo: null,
      setUpdateInfo: (info) => set({ updateInfo: info }),
    }),
    {
      name: 'user_info',
      storage: customStorage,
    },
  ),
);

export default useUpdateInfoStore;
