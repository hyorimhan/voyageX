import { User } from '@supabase/supabase-js';

export type ExtendedUser = User & {
  provider?: string;
};

export type authType = {
  user: ExtendedUser | null;
  saveUser: (info: ExtendedUser | null) => string | void;
};
