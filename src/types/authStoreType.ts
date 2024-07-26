import { User } from '@supabase/supabase-js';

export type authType = {
  user: User | null;
  saveUser: (info: User | null) => string | void;
};
