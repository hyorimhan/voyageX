export interface Tour {
  id: string;
  price: number | null;
  tag: string | null;
  amount: number | null;
  planets: {
    name: string | null;
    planet_img: string;
    description: string | null;
    title: string | null;
    english_name: string;
  };
}

export interface tourProps {
  params: {
    id: string;
  };
}
