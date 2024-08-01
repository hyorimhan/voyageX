export interface Tour {
  id: string;
  price: number;
  tag: string | null;
  amount: number | null;
  planets: {
    name: string | null;
    planet_img: string;
    description: string | null;
    title: string | null;
    english_name: string;
  };
  rating_avg?: number;
}

export interface tourProps {
  params: {
    id: string;
  };
}
