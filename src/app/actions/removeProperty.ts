"use server"
import { SERVER_URL } from "../lib/constants";
import { revalidateTag } from "next/cache";

export const removeProperty = async (itemId: number, accessToken?: string) => {

    if (!accessToken) {
        console.log('unautorizationnnnnnnn')
    } else {
        try {
            const response = await fetch(`${SERVER_URL}/comments/${itemId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            // const contentType = response.headers.get('content-type');
            // if (contentType && contentType.includes('application/json')) {
            //     revalidateTag('property')
            //     return await response.json(); // Якщо це JSON, розбираємо його
            // } else {
            //     return await response.text(); // Якщо це текст, просто повертаємо його
            // }

            revalidateTag('property')
            return await response.json();

        } catch (error) {
            console.error('Failed to remove item from cart:', error);
            throw error;
        }
    }
};