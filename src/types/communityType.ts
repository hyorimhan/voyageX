export type Posts<IsDetail extends boolean = false> = {
  category: string;
  content: string;
  created_at: string;
  id: string;
  like_count: number;
  title: string;
  user_id: string;
} & (IsDetail extends true
  ? {
      writer: {
        profileIMG: string;
      };
    }
  : {});
