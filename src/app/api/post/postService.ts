import { IPost } from "@/app/types/post";
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

export const fetchProductProperty = async (itemId: string) => {
  try {
    const response = await fetch(`${config.serverURL}/comments/byPostId/${itemId}`, {
      method: 'GET',
      next: { tags: ['property'] },
      headers: { 'Content-Type': 'application/json' },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch product property:', error);
    throw error;
  }
};

export const fetchOnePost = async (id: string): Promise<IPost> => {
  try {
    const response = await fetch(`${config.serverURL}/posts/getOne/${id}`, {
      next: { tags: ['post'] },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    throw error;
  }
};