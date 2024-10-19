"use server"
import { handleResponse } from "@/app/utils/handleResponse"
import { revalidateMultipleTags } from "../utils/revalidateItems";

// const config = {
//     serverURL: process.env.SERVER_URL,
//     apiURL: 'https://furniture.fly.dev',
//     localURL: 'http://localhost:8080',
// };

export async function createPost(formData: FormData, token: string | null) {

    try {
        const response = await fetch(`https://furniture.fly.dev/posts/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // revalidateTag('posts')
        revalidateMultipleTags(['posts', 'pagination'])
        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
    }
}
