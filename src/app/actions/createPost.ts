"use server"
import { handleResponse } from "@/app/utils/handleResponse"
import { revalidateMultipleTags } from "../utils/revalidateItems";

const config = {
    serverURL: process.env.SERVER_URL,
    apiURL: 'https://furniture.fly.dev',
    localURL: 'http://localhost:8080',
};

export async function createPost(formData: FormData, token: string | null) {
    if (!token) {
        throw new Error('Unauthorized: No access token');
    }

    // Логуємо FormData
    console.log('FormData content:');
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(`${key}: file name=${value.name}, size=${value.size}, type=${value.type}`);
        } else {
            console.log(`${key}: ${value}`);
        }
    }

    try {
        const response = await fetch(`${config.serverURL}/posts/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        revalidateMultipleTags(['posts', 'pagination']);
        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
    }
}
