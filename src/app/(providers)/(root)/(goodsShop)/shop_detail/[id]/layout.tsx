import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import axios from 'axios';
import { Metadata } from 'next';

interface GoodsLayOutParams {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: GoodsLayOutParams): Promise<Metadata> => {
  const { id } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('goods')
    .select('goods_name')
    .eq('id', id)
    .single();
  if (error || !data) {
    console.error(error);
    throw error;
  }
  return {
    title: `${data.goods_name}`,
    description: `Voyage X의 상품 ${data.goods_name}의 상세 정보`,
  };
};

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <>{children}</>;
};

export default layout;
