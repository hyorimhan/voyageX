import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import CryptoJS, { enc } from 'crypto-js';

type tourInfoType = {
  tour_id: string;
  user_id: string;
  depart_place: string;
  depart_date: string;
  arrive_place: string;
  arrive_date: string;
  spaceship_name: string;
  spaceship_code: string;
  flight_type: string;
  seat_code: string;
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

const useTourOrderInfo = create<tourOrderInfoType>()(
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

export default useTourOrderInfo;
