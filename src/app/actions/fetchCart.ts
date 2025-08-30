'use server'
import { handleResponse } from "../utils/handleResponse";
import { cookies } from "next/headers";
import { SERVER_URL } from "../lib/constants";

export const fetchCart = async () => {
    const cookieStore = cookies();
    const cartCookie = cookieStore.get('cart_ids');

    if (!cartCookie?.value) {
        return null
    }

    const ids = JSON.parse(cartCookie.value)

    try {
        const response = await fetch(`${SERVER_URL}/cart/byIds`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            next: { tags: ['cart'] },
            body: JSON.stringify({ "ids": ids })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to fetch post:', error);
        throw error;
    }
}