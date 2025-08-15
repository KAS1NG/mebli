import { IGetProperty, IPost } from "@/app/types/post";
import { handleResponse } from "@/app/utils/handleResponse"

const config = {
  serverURL: process.env.SERVER_URL,
  apiURL: 'https://furniture.fly.dev',
  localURL: 'http://localhost:8080',
}

export const fetchPosts = async (query: string, page: number): Promise<IPost[]> => {
  const limit = 6;
  try {
    const response = await fetch(`${config.serverURL}/posts/?page=${page}&limit=${limit}&query=${query}`, {
      next: { tags: ['posts'] },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
};

// export const fetchProductProperty = async (itemId: string, options?: RequestInit) => {
//   try {
//     const response = await fetch(`${config.serverURL}/comments/byPostId/${itemId}`, {
//       method: 'GET',
//       next: { tags: ['property'] },
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to fetch product property:', error);
//     throw error;
//   }
// };

// export const fetchOnePost = async (id: string, options?: RequestInit): Promise<IPost> => {
//   try {
//     const response = await fetch(`${config.serverURL}/posts/getOne/${id}`, {
//       next: { tags: ['post'] },
//     });

//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to fetch post:', error);
//     throw error;
//   }
// };

// export const fetchAll = async (): Promise<IPost[]> => {
//   try {
//     const response = await fetch(`${config.serverURL}/posts/all`);

//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to fetch post:', error);
//     throw error;
//   }
// };

// export async function fetchAllPostIds() {
//     const posts = await fetchAll(); // [{ id, title, ... }]
//     return posts.map((p: { id: string | number, title: string }) => ({
//         id: p.id,
//         title: p.title
//     }));
// }

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

export const fetchProductProperty = async (
  itemId: string,
  options?: RequestInit
): Promise<IGetProperty[]> => {
  return baseFetch<IGetProperty[]>(`${config.serverURL}/comments/byPostId/${itemId}`, {
    method: "GET",
    next: { tags: ["property"], revalidate: 60 },
    ...options,
  });
};

/**
 * Отримати один пост за ID.
 * Використовує ISR (revalidate: 60).
 */
export const fetchOnePost = async (
  id: string,
  options?: RequestInit
): Promise<IPost> => {
  return baseFetch<IPost>(`${config.serverURL}/posts/getOne/${id}`, {
    next: { tags: ["post"], revalidate: 60 },
    ...options,
  });
};

/**
 * Отримати всі пости.
 * Додаємо тег для можливості revalidateTag('posts').
 */
export const fetchAll = async (options?: RequestInit): Promise<IPost[]> => {
  return baseFetch<IPost[]>(`${config.serverURL}/posts/all`, {
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