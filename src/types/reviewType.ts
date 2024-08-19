export type Review = {
  id: string;
  user_id: string;
  rating: number;
  review: string;
  created_at: string;
  user: { email: string };
};
