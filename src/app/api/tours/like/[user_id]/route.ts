import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export type ParamsType = {
  params: { user_id: string };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  const supabase = createClient();
  const { user_id } = params;
  const { data: likedPlanetIds, error: likedPlanetError } = await supabase
    .from('liked_tours')
    .select('tour_id')
    .eq('user_id', user_id);
  if (likedPlanetError || !likedPlanetIds)
    return NextResponse.json({ error: likedPlanetError });
  const idList = likedPlanetIds.map((id) => id.tour_id);
  const { data, error } = await supabase
    .from('tours')
    .select('*, planets: planet_id(*)')
    .in('id', idList);
  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
};
