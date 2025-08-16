"use server"
import { getServerSession } from "next-auth/next";
import { revalidateMultipleTags } from "../utils/revalidateItems";
import authOptions from "../utils/authOptions";
import { SERVER_URL } from "../lib/constants";

export const removeProperty = async (itemId: number) => {
   
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ROLE_ADMIN') {
        console.log('unautorizationnnnnnnn')
    } else {
        try {
            const response = await fetch(`${SERVER_URL}/comments/${itemId.toString()}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                }
            });

            // Перевірка типу контенту у відповіді
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                revalidateMultipleTags(['property'])
                return await response.json(); // Якщо це JSON, розбираємо його
            } else {
                return await response.text(); // Якщо це текст, просто повертаємо його
            }

        } catch (error) {
            console.error('Failed to remove item from cart:', error);
            throw error;
        }
    }
};