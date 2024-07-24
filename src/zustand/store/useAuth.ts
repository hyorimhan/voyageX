import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

type authType = {
  user: User | null;
  saveUser: (info: User | null) => string | void;
};

const useAuthStore = create<authType>((set) => ({
  user: null,
  saveUser: (info) => set({ user: info }),
}));

export default useAuthStore;
