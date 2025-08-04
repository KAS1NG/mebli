"use server"
import { handleResponse } from "@/app/utils/handleResponse"

const config = {
    serverURL: process.env.SERVER_URL,
    apiURL: 'https://furniture.fly.dev',
    localURL: 'http://localhost:8080',
};

// export async function checkout(formData: FormData, token: string | null) {

//     try {
//         const response = await fetch(`${config.serverURL}/cart/acceptOrder`, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             body: formData,
//         });

//         // revalidateTag('posts')
       
//          return await response
//         // return await handleResponse(response);
//     } catch (error) {
//         console.error('Failed to create post:', error);
//         throw error;
//     }
// }




export async function makeOrder(formData: FormData) {

    try {
        const response = await fetch(`${config.serverURL}/cart/acceptOrder`, {
            method: 'POST',
            body: formData,
        });
       
        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
    }
}
