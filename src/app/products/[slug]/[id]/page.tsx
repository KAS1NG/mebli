import { notFound, redirect } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";

import {
  fetchOnePost,
  fetchProductProperty,
  fetchAllPostIds,
  fetchPosts,
} from "@/app/api/post/postService";

import { transliterateAndClear } from "@/app/utils/clearUrlString";
import ProductDetail from "@/app/components/product/ProductDetail";
import { stringToArray } from "@/app/utils/stringToArr";
import { getProductUrl } from "@/app/lib/getProductUrl";

type Params = {
  slug: string;
  id: string;
};

// ======================================================
// 1️⃣ generateStaticParams — SSG
// ======================================================
export async function generateStaticParams(): Promise<Params[]> {
  const products = await fetchAllPostIds();
  return products.map((p) => ({
    id: p.id.toString(),
    slug: transliterateAndClear(p.title),
  }));
}

// ======================================================
// 2️⃣ generateMetadata — SEO + OpenGraph
// ======================================================
export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params; // ✅ треба await
  const product = await fetchOnePost(id, { next: { revalidate: 60 } });
  if (!product?.id) notFound();
  
  const previousImages = (await parent).openGraph?.images || [];
  const img = product.images?.[0];
  // const cleanSlug = transliterateAndClear(product.title);
  const URL_ITEM = getProductUrl(product.title, product.id)

  return {
    title: `${product.title} – Купити у Ромнах | Ціна ${product.price} ₴`,
    description: `Купити ${product.title} у Ромнах ${product.tags[0]} у Ромнах. Доставка, якісні меблі Сумська область.`,
    alternates: { canonical: `https://mebliromny.com.ua${URL_ITEM}` },
    openGraph: {
      type: "article",
      title: product.title,
      description: product.description ?? undefined,
      images: [
        { url: img, width: 1200, height: 630, alt: `${product.title} у Ромнах` },
        ...previousImages,
      ],
      url: `https://mebliromny.com.ua${URL_ITEM}`,
      siteName: "Меблі Ромни",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Меблі Ромни`,
      description: `Купити ${product.title} у Ромнах – якісні меблі з доставкою.`,
      images: [img, ...previousImages],
    },
    robots: { index: true, follow: true },
  };
}

// ======================================================
// 3️⃣ ProductPage — серверний компонент
// ======================================================
export default async function ProductPage({params,}: {params: Promise<Params>}) {
  const { id, slug } = await params

  const [product, productProperty] = await Promise.all([
    fetchOnePost(id, { next: { revalidate: 60 } }),
    fetchProductProperty(id, { next: { revalidate: 60 } }),
  ]);

  if (!product?.id) notFound();

  const cleanSlug = transliterateAndClear(product.title);
  if (slug !== cleanSlug) {
    redirect(`/products/${cleanSlug}/${product.id}`);
  }

  const tagsArray = stringToArray(product.tags || "");
  const invoices = await fetchPosts(1, tagsArray[0]);

    // ✅ schema.org Product JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: `SHF-${product.id}`,
    brand: { "@type": "Brand", name: "Mebli Romny" },
    offers: {
      "@type": "Offer",
      url: `https://mebliromny.com.ua/products/${cleanSlug}/${product.id}`,
      priceCurrency: "UAH",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Меблі Ромни" },
    },
  };

  return (
    <>
      <ProductDetail
        product={product}
        productProperty={productProperty}
        invoices={invoices}
      />
      <Script
        id="json-ld-product"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}

// ======================================================
// 4️⃣ ISR — глобальне revalidate
// ======================================================
export const revalidate = 60;
