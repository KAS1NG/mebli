import { transliterateAndClear } from "../utils/clearUrlString";

export function getProductUrl(title: string, id: number) {
  return `/products/${transliterateAndClear(title)}/${id}`
}