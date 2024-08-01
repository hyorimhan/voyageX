import { createClient } from '@/supabase/client';
import { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

type Goods = Database['public']['Tables']['goods']['Row'];

const useFetchGoods = () => {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('goods').select('*');

        if (error) {
          throw error;
        }

        setGoods(data as Goods[]);
      } catch (err) {
        const error = err as PostgrestError; // supabase 내장 오류 타입
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoods();
  }, []);

  return { goods, loading, error };
};

export default useFetchGoods;
