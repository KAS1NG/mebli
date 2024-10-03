import { getServerSession } from "next-auth/next";
import { defaultHeaders } from "../utils/defaultHeaders";
import { handleResponse } from "../utils/handleResponse";
import authOptions from "../utils/authOptions";

const config = {
    serverURL: process.env.SERVER_URL,
    apiURL: 'https://furniture.fly.dev',
    localURL: 'http://localhost:8080',
}

export const fetchCart = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        console.log('unautorizationnnnnnnn')
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
};