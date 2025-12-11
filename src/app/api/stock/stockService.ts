"use server"
import { SERVER_URL } from "@/app/lib/constants";
import { IStock, IStockVariants } from "@/app/types/stock";

import authOptions from "@/app/utils/authOptions";
import { handleResponse } from "@/app/utils/handleResponse";
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache";


export const fetchStock = async (): Promise<IStock[]> => {

    const session = await getServerSession(authOptions)

    try {
        const response = await fetch(`${SERVER_URL}/stock/all-active`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
            //   next: { tags: ['posts'], revalidate: 30 },
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
    }
}

export const fetchOutStock = async (): Promise<IStock[]> => {

    const session = await getServerSession(authOptions)

    try {
        const response = await fetch(`${SERVER_URL}/stock/out`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
    }
}

export const fetchVariantsStock = async (): Promise<IStockVariants[]> => {

    const session = await getServerSession(authOptions)

    try {
        const response = await fetch(`${SERVER_URL}/variants/getAll`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
              next: { tags: ['Variants'], revalidate: 30 },
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
    }
}

export async function createVariant(formData: FormData) {
    const session = await getServerSession(authOptions)

    const name = formData.get('name') as string;
    const color = formData.get('color') as string;
    const size = formData.get('size') as string;
    const manufactureTime = formData.get('manufactureTime') as string;
    const ItemID = formData.get('ItemID')


    const response = await fetch(`${SERVER_URL}/variants`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({name, color, size, manufactureTime, ItemID})
    });

    revalidateTag('Variants')

    return handleResponse(response);
}

export async function createStock(variantId?: number) {
    const session = await getServerSession(authOptions)

    console.log(variantId)
    
    const response = await fetch(`${SERVER_URL}/stock/add/${variantId}/1`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    });

    revalidateTag('Variants')

    return handleResponse(response);
}

export async function deleteStock(variantId?: number) {
    const session = await getServerSession(authOptions)

    console.log(variantId)
    
    const response = await fetch(`${SERVER_URL}/stock/remove/${variantId}/1`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    });

    revalidateTag('Variants')

    return handleResponse(response);
}