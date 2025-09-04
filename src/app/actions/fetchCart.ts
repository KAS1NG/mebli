'use server'
import { handleResponse } from "../utils/handleResponse";
import { cookies } from "next/headers";
import { SERVER_URL } from "../lib/constants";

export const fetchCart = async () => {
    const cookieStore = cookies();
    const cartCookie = (await cookieStore).get('cart_ids');

    if (!cartCookie?.value) {
        return []; // повертаємо порожній масив замість null
    }

    let ids: number[] = [];
    try {
        ids = JSON.parse(cartCookie.value);
    } catch (error) {
        console.error('Invalid cart_ids cookie:', error);
        return []; // некоректні дані — повертаємо порожній масив
    }

    try {
        const response = await fetch(`${SERVER_URL}/cart/byIds`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            next: { tags: ['cart'] },
            body: JSON.stringify({ ids })
        });

        const data = await handleResponse(response);
        // Перевіряємо, чи data — масив
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Failed to fetch post:', error);
        return []; // у разі помилки повертаємо порожній масив
    }
};
