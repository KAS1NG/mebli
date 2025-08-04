import { getServerSession } from "next-auth/next";
import { defaultHeaders } from "../utils/defaultHeaders";
import { handleResponse } from "../utils/handleResponse";
import { cookies } from "next/headers";
import authOptions from "../utils/authOptions";

const config = {
    serverURL: process.env.SERVER_URL,
    apiURL: 'https://furniture.fly.dev',
    localURL: 'http://localhost:8080',
}

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
            const response = await fetch(`${config.serverURL}/cart/byIds`, {
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
            const response = await fetch(`${config.serverURL}/cart/${session.user.userId}`, {
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