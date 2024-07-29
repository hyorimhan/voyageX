export type Address = {
  alias: string | null;
  postcode: string | null;
  address: string | null;
  oldAddress: string | null;
  detailAddress: string | null;
  recipient: string | null;
  phone: string | null;
  is_default: boolean | null;
};

export type Customer = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
};

export type Item = {
  id: string;
  name: string;
  createdAt: string;
  price: number;
  description: string;
  img: string;
  quantity: number;
};

export type ItemList = Item[];
