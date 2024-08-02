export interface Tour {
  id: string;
  price: number;
  tag: string;
  amount: number | null;
  planets: {
    name: string;
    planet_img: string;
    description: string;
    title: string | null;
    english_name: string | null;
  } | null;
  rating_avg?: number;
}

export interface tourProps {
  params: {
    id: string;
  };
}
