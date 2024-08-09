import { ItemToBuyType } from '@/types/goods';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

type ItemListType = {
  goodsOrderInfo: ItemToBuyType[] | null;
  setGoodsOrderInfo: (itemList: ItemToBuyType[] | null) => void;
};

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_KEY!;

const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const customStorage = createJSONStorage<ItemListType>(() => ({
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

const useGoodsOrderStore = create<ItemListType>()(
  persist(
    (set) => ({
      goodsOrderInfo: null,
      setGoodsOrderInfo: (goodsOrderInfo) => set({ goodsOrderInfo }),
    }),
    {
      name: 'itemList',
      storage: customStorage,
    },
  ),
);

export default useGoodsOrderStore;
