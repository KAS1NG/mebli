// src/app/products/[slug]/[id]/page.tsx

import { notFound, redirect } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

import {
    fetchOnePost,
    fetchProductProperty,
    fetchAllPostIds,
} from "@/app/api/post/postService";

import { transliterateAndClear } from "@/app/utils/clearUrlString";
import ProductDetail from "@/app/components/product/ProductDetail";
import "@/app/styles/productDetail.scss";

interface ProductPageProps {
    params: {
        slug: string;
        id: string;
    };
}

// ======================================================
// 1️⃣ generateStaticParams — SSG
// ======================================================
export async function generateStaticParams(): Promise<
    ProductPageProps["params"][]
> {
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
    { params }: ProductPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = params;

    const product = await fetchOnePost(id, {
        next: { revalidate: 60 },
    });

    if (!product?.id) notFound();

    const previousImages = (await parent).openGraph?.images || [];
    const img =
        product.images?.[0] ||
        `${process.env.NEXT_PUBLIC_BASE_URL}/default.jpg`;

    return {
        title: product.title,
        description: product.description ?? undefined,
        alternates: {
            canonical: `/products/${transliterateAndClear(product.title)}/${product.id}`,
            languages: {
                "uk-UA": `/uk-UA/products/${transliterateAndClear(product.title)}/${product.id}`,
                "ru-RU": `/ru-RU/products/${transliterateAndClear(product.title)}/${product.id}`,
            },
        },
        openGraph: {
            type: "article",
            title: product.title,
            description: product.description ?? undefined,
            images: [img, ...previousImages],
        },
    };
}

// ======================================================
// 3️⃣ ProductPage — серверний компонент
// ======================================================
export default async function ProductPage({ params }: ProductPageProps) {
    const { id, slug } = params;

    // 🚀 Паралельні запити — швидше, ніж послідовно
    const [product, productProperty] = await Promise.all([
        fetchOnePost(id, { next: { revalidate: 60 } }),
        fetchProductProperty(id, { next: { revalidate: 60 } }), // ✅ тип IGetProperty[]
    ]);

    if (!product?.id) notFound();

    // 🔗 Перевірка slug для SEO
    const cleanSlug = transliterateAndClear(product.title);
    if (slug !== cleanSlug) {
        redirect(`/products/${cleanSlug}/${product.id}`);
    }

    return (
        <ProductDetail
            product={product}
            productProperty={productProperty}
        />
    );
}

// ======================================================
// 4️⃣ ISR — глобальне revalidate
// ======================================================
export const revalidate = 60;
