"use server"
import { handleResponse } from "@/app/utils/handleResponse"
import { revalidateMultipleTags } from "../utils/revalidateItems";
import { SERVER_URL } from "../lib/constants";

export async function editPost(formData: FormData, postId: number, token: string | null) {

    try {
        const response = await fetch(`${SERVER_URL}/posts/update/${postId}`, {
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
