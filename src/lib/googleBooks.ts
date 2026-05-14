export type GBook = {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  cover?: string;
  categories?: string[];
  publishedDate?: string;
  pageCount?: number;
};

const upgrade = (url?: string) => url?.replace(/^http:/, "https:").replace("&edge=curl", "");

export async function searchBooks(query: string, max = 20): Promise<GBook[]> {
  if (!query.trim()) return [];
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${max}&printType=books`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Google Books search failed");
  const data = await res.json();
  return (data.items ?? []).map((it: any) => ({
    id: it.id,
    title: it.volumeInfo?.title ?? "Untitled",
    authors: it.volumeInfo?.authors ?? ["Unknown"],
    description: it.volumeInfo?.description,
    cover: upgrade(it.volumeInfo?.imageLinks?.thumbnail ?? it.volumeInfo?.imageLinks?.smallThumbnail),
    categories: it.volumeInfo?.categories,
    publishedDate: it.volumeInfo?.publishedDate,
    pageCount: it.volumeInfo?.pageCount,
  }));
}

export async function getBookById(id: string): Promise<GBook | null> {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  if (!res.ok) return null;
  const it = await res.json();
  return {
    id: it.id,
    title: it.volumeInfo?.title ?? "Untitled",
    authors: it.volumeInfo?.authors ?? ["Unknown"],
    description: it.volumeInfo?.description,
    cover: upgrade(it.volumeInfo?.imageLinks?.thumbnail ?? it.volumeInfo?.imageLinks?.small),
    categories: it.volumeInfo?.categories,
    publishedDate: it.volumeInfo?.publishedDate,
    pageCount: it.volumeInfo?.pageCount,
  };
}