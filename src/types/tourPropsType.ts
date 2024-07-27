export interface Tour {
  id: string;
  price: number;
  tag: string;
  planets: {
    name: string;
    planet_img: string;
    description: string;
  };
}

export interface tourProps {
  params: {
    id: string;
  };
}
