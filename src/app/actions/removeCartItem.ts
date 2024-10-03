"use server"
import { getServerSession } from "next-auth/next";
import { defaultHeaders } from "../utils/defaultHeaders";
import { revalidateTag } from "next/cache";
import authOptions from "../utils/authOptions";

const config = {
    serverURL: process.env.SERVER_URL,
    apiURL: 'https://furniture.fly.dev',
    localURL: 'http://localhost:8080',
}

export const removeCartItem = async (itemId: number) => {
   
    const session = await getServerSession(authOptions)

    if (!session) {
        console.log('unautorizationnnnnnnn')
    } else {
        try {
            const response = await fetch(`${config.serverURL}/cart/${itemId.toString()}`, {
                method: 'DELETE',
                headers: defaultHeaders(session.accessToken),
            });
            
            // Перевірка типу контенту у відповіді
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json(); // Якщо це JSON, розбираємо його
            } else {
                revalidateTag('cart')
                return await response.text(); // Якщо це текст, просто повертаємо його
            }

        } catch (error) {
            console.error('Failed to remove item from cart:', error);
            throw error;
        }
    }
};