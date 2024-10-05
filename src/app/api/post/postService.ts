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

// export const createPosts = async (formData: FormData, token: string | null) => {
//   try {
//     const response = await fetch(`${config.localURL}/posts/create`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });
//     await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to create post:', error);
//     throw error;
//   }
// };

// export const fetchPageCount = async (query: string): Promise<number> => {
//   const limit = 6
//   try {
//     const response = await fetch(`${config.localURL}/posts/fetch?query=${query}&page=1&limit=${limit}`);
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to fetch page count:', error);
//     throw error;
//   }
// };

// export const fetchCart = async (userId: string, token: string | null): Promise<IPost[]> => {
  
//   try {
//     const response = await fetch(`${config.localURL}/cart/${userId}`, {
//       headers: defaultHeaders(token),
//     });
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to fetch cart items:', error);
//     throw error;
//   }
// };

// export const fetchCart = async (userId: string, token: string | null): Promise<IPost[]> => {
  
//   try {
//     const response = await fetch(`${config.localURL}/cart/${userId}`, {
//       headers: defaultHeaders(token),
//     });
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to fetch cart items:', error);
//     throw error;
//   }
// };

// export const removeCartItem = async (itemId: string, token: string | null) => {
//   try {
//     const response = await fetch(`${config.localURL}/cart/${itemId}`, {
//       method: 'DELETE',
//       headers: defaultHeaders(token),
//     });
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to remove item from cart:', error);
//     throw error;
//   }
// };

// export const addProductProperty = async (property: Record<string, any>, itemId: number, token: string | null) => {
//   try {
//     const response = await fetch(`${config.localURL}/comments/${itemId}`, {
//       method: 'POST',
//       headers: defaultHeaders(token),
//       body: JSON.stringify(property),
//     });
//     await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to add product property:', error);
//     throw error;
//   }
// };