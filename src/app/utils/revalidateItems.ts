"use server"
import { revalidateTag } from "next/cache";

export async function revalidateMultipleTags(tagsArray: string[]) {
    for (const tag of tagsArray) {
        await revalidateTag(tag);  // Optionally use `await` for asynchronous control
    }
}