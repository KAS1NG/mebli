import { productLimit, SERVER_URL } from "../lib/constants";
import { handleResponse } from "../utils/handleResponse";

export const fetchPageCount = async (query: string): Promise<number> => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/fetch?query=${query}&page=1&limit=${productLimit}`, {
      next: { tags: ['pagination'] },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch page count:', error);
    throw error;
  }
};