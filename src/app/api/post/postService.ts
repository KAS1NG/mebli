import { productLimit, SERVER_URL } from "@/app/lib/constants";
import { IGetProperty, IPost, IPreviewPost } from "@/app/types/post";
import { handleResponse } from "@/app/utils/handleResponse"


export const fetchPosts = async (page: string | number, query?: string): Promise<IPreviewPost[]> => {

  const params = new URLSearchParams({ page: String(page), limit: productLimit });
  if (query) params.set('query', query);

  const start = performance.now(); // час перед запитом

  try {
    const response = await fetch(`${SERVER_URL}/posts/preview?${params}`, {
      next: { tags: ['posts'], revalidate: 30 },
    });

    const end = performance.now(); // час після виконання
    console.log(`fetchPosts виконано за ${(end - start).toFixed(2)} ms`);

    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}

/**
 * Базовий fetch-запит із дефолтними опціями.
 * Дозволяє передати кастомні параметри (method, headers, next і т.д.)
 */
async function baseFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error(`❌ Fetch error: ${url}`, error);
    throw error;
  }
}

export const fetchProductProperty = async (itemId: string, options?: RequestInit): Promise<IGetProperty[]> => {
  return baseFetch<IGetProperty[]>(`${SERVER_URL}/comments/byPostId/${itemId}`, {
    method: "GET",
    next: { tags: ["property"], revalidate: 60 },
    ...options,
  });
};

export const fetchOnePost = async (
  id: string,
  options?: RequestInit
): Promise<IPost> => {
  return baseFetch<IPost>(`${SERVER_URL}/posts/getOne/${id}`, {
    next: { tags: ["post"], revalidate: 60 },
    ...options,
  });
};

/**
 * Отримати всі пости.
 * Додаємо тег для можливості revalidateTag('posts').
 */
export const fetchAll = async (options?: RequestInit): Promise<IPost[]> => {
  return baseFetch<IPost[]>(`${SERVER_URL}/posts/all`, {
    next: { tags: ["posts"], revalidate: 300 }, // список можна рідше оновлювати
    ...options,
  });
};

/**
 * Отримати всі ID + title постів (для SSG).
 * ⚠️ Якщо постів дуже багато — краще зробити окремий бекенд-ендпоінт `/posts/ids`.
 */
export async function fetchAllPostIds() {
  const posts = await fetchAll();
  return posts.map((p) => ({
    id: p.id.toString(),
    title: p.title,
  }));
}