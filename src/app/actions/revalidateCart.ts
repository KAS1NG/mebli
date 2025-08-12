"use server";

import { revalidateTag } from "next/cache";

export async function revalidateCart() {
  revalidateTag("cart");
}