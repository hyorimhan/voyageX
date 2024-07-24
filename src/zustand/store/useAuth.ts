import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

type authType = {
  user: User | null;
  userInfo: (info: User | null) => string | void;
};

const useAuthStore = create<authType>((set) => ({
  user: null,
  userInfo: (info) => set({ user: info }),
}));

export default useAuthStore;
