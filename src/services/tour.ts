import { createClient } from '@/supabase/client';

const supabase = createClient();

// 투어 리스트
export const tourList = async () => {
  const { data: tours, error } = await supabase.from('tours').select(`
    id,
    price, 
    tag,
    planets (
      name, 
      planet_img,
      description,
      title,
      english_name
    )
  `);
  return { tours, error };
};

// 투어 상세
export const tourDetail = async (id: string) => {
  const { data: tours, error } = await supabase
    .from('tours')
    .select(
      `
  price,
  tag,
  id,
  planets (
    name,
    description,
    planet_img,
    title,
    english_name
  )
  `,
    )
    .eq('id', id);

  return { tours, error };
};

//투어 결제 (주문자 정보)
export const userAddress = async (id: string) => {
  const { data: address, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', id);
  return { address, error };
};

// 투어 결제 (테이블에 넣기)
export const tourPayment = async (userId: string, tourId: string) => {
  const { data: payment, error } = await supabase
    .from('tour_orders')
    .insert([{ user_id: 'id', tour_id: 'tourId' }])
    .select();
  return { payment, error };
};
