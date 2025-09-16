import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataUrl(imageUrl: string) {
  const res = await fetch(imageUrl);
  const buffer = Buffer.from(await res.arrayBuffer());

 const { base64 } = await getPlaiceholder(buffer, { size: 32 });
  return base64;
}
