export interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  read_time: number;
  created_at: string;
  link: string;
}

export interface SearchResult {
  results: NewsItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
