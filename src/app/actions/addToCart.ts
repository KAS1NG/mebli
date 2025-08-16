"use server"
import { revalidateTag } from "next/cache";
import { IAddCartInfo } from "../types/post";
import { defaultHeaders } from "../utils/defaultHeaders";
import { getServerSession } from "next-auth"
import authOptions from "../utils/authOptions";
import { SERVER_URL } from "../lib/constants";

export async function addToCart(cartItemDTO: IAddCartInfo) {

    const session = await getServerSession(authOptions)

    if (!session) {
        console.log('unautorizationnnnnnnn')
    } else {
        try {
            const response = await fetch(`${SERVER_URL}/cart/add`, {
                method: 'POST',
                headers: defaultHeaders(session.accessToken),
                body: JSON.stringify({
                    userId: session.user.userId,
                    itemId: cartItemDTO.itemId.toString(),
                    quantity: 1
                }),
            });

            // Перевірка, чи запит був успішним
            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(`Error: ${response.status} - ${errorMsg}`);
            }

            // Перевірка типу контенту у відповіді
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json(); // Якщо це JSON, розбираємо його
            } else {
                revalidateTag('cart')
                return await response.text(); // Якщо це текст, просто повертаємо його
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            throw error;
        }
    }
}
