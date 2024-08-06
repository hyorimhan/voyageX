export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string
          alias: string
          detailAddress: string
          id: string
          is_default: boolean
          oldAddress: string
          phone: string
          postcode: string
          recipient: string
          user_id: string
        }
        Insert: {
          address: string
          alias: string
          detailAddress: string
          id?: string
          is_default?: boolean
          oldAddress: string
          phone: string
          postcode: string
          recipient: string
          user_id: string
        }
        Update: {
          address?: string
          alias?: string
          detailAddress?: string
          id?: string
          is_default?: boolean
          oldAddress?: string
          phone?: string
          postcode?: string
          recipient?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "adresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cart: {
        Row: {
          created_at: string
          goods_id: string
          id: string
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          goods_id?: string
          id?: string
          quantity?: number
          user_id: string
        }
        Update: {
          created_at?: string
          goods_id?: string
          id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_product_id_fkey"
            columns: ["goods_id"]
            isOneToOne: false
            referencedRelation: "goods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      goods: {
        Row: {
          created_at: string
          description: string
          goods_img: string
          goods_name: string
          goods_price: number
          id: string
          like_count: number
          rating_avg: number
        }
        Insert: {
          created_at?: string
          description: string
          goods_img: string
          goods_name: string
          goods_price: number
          id?: string
          like_count?: number
          rating_avg?: number
        }
        Update: {
          created_at?: string
          description?: string
          goods_img?: string
          goods_name?: string
          goods_price?: number
          id?: string
          like_count?: number
          rating_avg?: number
        }
        Relationships: []
      }
      goods_orders: {
        Row: {
          address: string
          express_cost: number
          goods_id: string
          id: string
          installment: number
          pay_at: string
          pay_method: string
          phone: string
          quantity: number
          recipient: string
          state: string
          total_price: number
          user_id: string
        }
        Insert: {
          address: string
          express_cost?: number
          goods_id?: string
          id: string
          installment?: number
          pay_at?: string
          pay_method: string
          phone: string
          quantity: number
          recipient: string
          state: string
          total_price: number
          user_id: string
        }
        Update: {
          address?: string
          express_cost?: number
          goods_id?: string
          id?: string
          installment?: number
          pay_at?: string
          pay_method?: string
          phone?: string
          quantity?: number
          recipient?: string
          state?: string
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goods_orders_goods_id_fkey"
            columns: ["goods_id"]
            isOneToOne: false
            referencedRelation: "goods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      goods_reviews: {
        Row: {
          created_at: string
          goods_id: string
          id: string
          rating: number
          review: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          goods_id?: string
          id?: string
          rating: number
          review: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          goods_id?: string
          id?: string
          rating?: number
          review?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goods_reviews_goods_id_fkey"
            columns: ["goods_id"]
            isOneToOne: false
            referencedRelation: "goods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      liked_goods: {
        Row: {
          created_at: string
          goods_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goods_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          goods_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "liked_goods_goods_id_fkey"
            columns: ["goods_id"]
            isOneToOne: false
            referencedRelation: "goods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "liked_goods_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      liked_tours: {
        Row: {
          created_at: string
          id: string
          tour_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          tour_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          tour_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "liked_tour_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "liked_tour_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      planets: {
        Row: {
          description: string
          english_name: string | null
          id: string
          name: string
          planet_img: string
          title: string | null
        }
        Insert: {
          description: string
          english_name?: string | null
          id?: string
          name: string
          planet_img: string
          title?: string | null
        }
        Update: {
          description?: string
          english_name?: string | null
          id?: string
          name?: string
          planet_img?: string
          title?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_orders: {
        Row: {
          arrive_date: string
          arrive_place: string
          depart_date: string
          depart_place: string
          flight_type: string
          id: string
          passenger: string
          passenger_email: string
          pay_at: string
          phone: string
          qr_code: string
          seat_code: string
          spaceship_code: string
          spaceship_name: string
          tour_id: string
          user_id: string
        }
        Insert: {
          arrive_date: string
          arrive_place: string
          depart_date: string
          depart_place: string
          flight_type: string
          id?: string
          passenger: string
          passenger_email: string
          pay_at?: string
          phone: string
          qr_code: string
          seat_code: string
          spaceship_code: string
          spaceship_name: string
          tour_id?: string
          user_id: string
        }
        Update: {
          arrive_date?: string
          arrive_place?: string
          depart_date?: string
          depart_place?: string
          flight_type?: string
          id?: string
          passenger?: string
          passenger_email?: string
          pay_at?: string
          phone?: string
          qr_code?: string
          seat_code?: string
          spaceship_code?: string
          spaceship_name?: string
          tour_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_orders_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travel_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          amount: number | null
          id: string
          planet_id: string
          price: number
          tag: string
        }
        Insert: {
          amount?: number | null
          id?: string
          planet_id?: string
          price: number
          tag: string
        }
        Update: {
          amount?: number | null
          id?: string
          planet_id?: string
          price?: number
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "tours_planet_id_fkey"
            columns: ["planet_id"]
            isOneToOne: false
            referencedRelation: "planets"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string
          id: string
        }
        Insert: {
          email: string
          id?: string
        }
        Update: {
          email?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist: {
        Row: {
          goods_id: string
          id: string
          type: string
          user_id: string
        }
        Insert: {
          goods_id?: string
          id?: string
          type: string
          user_id?: string
        }
        Update: {
          goods_id?: string
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_goods_id_fkey"
            columns: ["goods_id"]
            isOneToOne: false
            referencedRelation: "goods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
