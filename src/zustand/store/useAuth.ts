import { authType } from '@/types/authStoreType';
import { create } from 'zustand';
import { createClient } from '@/supabase/client';
const supabase = createClient();

const useAuthStore = create<authType>((set) => ({
  user: null,
  saveUser: (info) => set({ user: info }),
  checkUser: async () => {
    const { data } = await supabase.auth.getSession();
    set({ user: data.session?.user || null });
  },
}));

export default useAuthStore;
