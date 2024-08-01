import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

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
const useUpdateInfoStore = create<userInfo>()(
  persist(
    (set) => ({
      updateInfo: null,
      setUpdateInfo: (info) => set({ updateInfo: info }),
    }),
    {
      name: 'user_info',
      getStorage: () => sessionStorage,
      serialize: (state) => encrypt(JSON.stringify(state)),
      deserialize: (state) => JSON.parse(decrypt(state)),
    },
  ),
);

export default useUpdateInfoStore;
