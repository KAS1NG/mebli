"use server"
import { handleResponse } from "@/app/utils/handleResponse"
import { SERVER_URL } from "../lib/constants";

export async function makeOrder(formData: FormData) {

    try {
        const response = await fetch(`${SERVER_URL}/cart/acceptOrder`, {
            method: 'POST',
            body: formData,
        });
       
        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
    }
}
