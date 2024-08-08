import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import CryptoJS, { enc } from 'crypto-js';

export type tourInfoType = {
  tour_id: string;
  price: number;
  planet_name: string;
  eng_name: string;
  planet_img: string;
  depart_date: string;
  arrive_date: string;
  gate: string;
  qr_code: string;
} | null;

type tourOrderInfoType = {
  tourOrder: tourInfoType;
  setTourOrder: (tourOrder: tourInfoType) => void;
};

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_KEY!;

const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const customStorage = createJSONStorage<tourOrderInfoType>(() => ({
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

const useTourOrderInfoStore = create<tourOrderInfoType>()(
  persist(
    (set) => ({
      tourOrder: null,
      setTourOrder: (tourOrder) => set({ tourOrder }),
    }),
    {
      name: 'tourOrderInfo',
      storage: customStorage,
    },
  ),
);

export default useTourOrderInfoStore;
