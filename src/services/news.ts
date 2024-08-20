export async function crawlNews() {
  const response = await fetch('/api/crawling');
  if (!response.ok) {
    throw new Error('Failed to crawl news');
  }
  return response.json();
}

export async function getNews(page: number = 1) {
  const response = await fetch(`/api/news?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
}
