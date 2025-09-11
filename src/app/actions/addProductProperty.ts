'use server'
import { defaultHeaders } from "../utils/defaultHeaders";
import { revalidateTag } from "next/cache";
import { SERVER_URL } from "../lib/constants";


export async function addProductProperty(
    id: number,
    property: { name: string; text: string }[],
    token?: string,
) {

    if (!token) {
        console.log('Недостатньо прав')
    } else {
        try {
            const response = await fetch(`${SERVER_URL}/comments/group/${id}`, {
                method: "POST",
                headers: defaultHeaders(token),
                body: JSON.stringify(property),
            }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Помилка: ${response.status} ${response.statusText}. Деталі: ${errorText}`
                );
            }

            revalidateTag('property')
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("❌ Помилка при відправці коментарів:", error);
            throw error;
        }
    }
}