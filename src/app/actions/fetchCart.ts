'use server'
import { getServerSession } from "next-auth/next";
import { defaultHeaders } from "../utils/defaultHeaders";
import { handleResponse } from "../utils/handleResponse";
import { cookies } from "next/headers";
import authOptions from "../utils/authOptions";
import { SERVER_URL } from "../lib/constants";

export const fetchCart = async () => {
    const session = await getServerSession(authOptions)
    const cookieStore = cookies();
    const cartCookie = cookieStore.get('cart_ids');

    if (!cartCookie?.value) {
        return null
    }

    if (!session) {
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
    } else {
        try {
            const response = await fetch(`${SERVER_URL}/cart/${session.user.userId}`, {
                headers: defaultHeaders(session.accessToken),
                next: { tags: ['cart'] },
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
            throw error;
        }
    }
}