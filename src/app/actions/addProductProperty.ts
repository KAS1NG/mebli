'use server'
import { getServerSession } from "next-auth/next";
import { defaultHeaders } from "../utils/defaultHeaders";
import { handleResponse } from "../utils/handleResponse";
import { revalidateTag } from "next/cache";
import authOptions from "../utils/authOptions";
import { SERVER_URL } from "../lib/constants";

export const addProductProperty = async (property: Record<string, string>, itemId: number) => {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ROLE_ADMIN') {
        console.log('Недостатньо прав')
    } else {
        try {
            const response = await fetch(`${SERVER_URL}/comments/${itemId}`, {
                method: 'POST',
                headers: defaultHeaders(session.accessToken),
                body: JSON.stringify(property),
            });

            revalidateTag('property')
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to add product property:', error);
            throw error;
        }
    }

};