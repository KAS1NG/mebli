import { handleResponse } from "../utils/handleResponse";

const config = {
    serverURL: process.env.SERVER_URL,
    apiURL: 'https://furniture.fly.dev',
    localURL: 'http://localhost:8080',
  }
  
export const fetchPageCount = async (query: string): Promise<number> => {
    const limit = 6

    try {
      const response = await fetch(`${config.serverURL}/posts/fetch?query=${query}&page=1&limit=${limit}`, {
        next: { tags: ['pagination'] },
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch page count:', error);
      throw error;
    }
  };