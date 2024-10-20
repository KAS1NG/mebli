"use server"
import { handleResponse } from "@/app/utils/handleResponse"
import { revalidateMultipleTags } from "../utils/revalidateItems";

const config = {
    serverURL: process.env.SERVER_URL,
    apiURL: 'https://furniture.fly.dev',
    localURL: 'http://localhost:8080',
};

export async function editPost(formData: FormData, postId: number, token: string | null) {

    try {
        const response = await fetch(`${config.serverURL}/posts/update/${postId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        revalidateMultipleTags(['post', 'posts', 'pagination'])
        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
    }
}
