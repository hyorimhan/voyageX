import { authType } from '@/types/authStoreType';
import { create } from 'zustand';

const useAuthStore = create<authType>((set) => ({
  user: null,
  saveUser: (info) => set({ user: info }),
}));

export default useAuthStore;
