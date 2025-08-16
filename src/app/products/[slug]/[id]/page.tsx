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
import Script from "next/script";

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
    const img = product.images?.[0]

    const URL_ITEM = `products/${transliterateAndClear(product.title)}/${product.id}`

    return {
        title: `${product.title} | Купити у Ромнах – Меблі Ромни`,
        description: `"Купити ${product.title} у Ромнах. Сучасний дизайн, якісні матеріали. Доставка та встановлення меблів по Сумській області.`,
        keywords: [
            product.title,
            `купити ${product.title} Ромни`,
            "меблі Ромни",
        ],

        alternates: {
            canonical: `https://mebliromny.com.ua/${URL_ITEM}`,
        },
        openGraph: {
            type: "article",
            title: product.title,
            description: product.description ?? undefined,
            // images: [img, ...previousImages],
            images: [
                {
                    url: img,
                    width: 1200,
                    height: 630,
                    alt: `${product.title} у Ромнах`,
                },
                ...previousImages
            ],
            url: `https://mebliromny.com.ua/${URL_ITEM}`,
            siteName: "Меблі Ромни",
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.title} | Меблі Ромни`,
            description:
                `Купити ${product.title} у Ромнах – якісні меблі з доставкою. Виготовлення під замовлення.`,
            images: [img, ...previousImages],
        },
        robots: {
            index: true,
            follow: true,
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

    // генерація productSchema 

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: product.images?.[0],
        description: product.description,
        sku: `SHF-${product.id}`,
        brand: { "@type": "Brand", name: "Mebli Romny" },
        offers: {
            "@type": "Offer",
            url: `products/${transliterateAndClear(product.title)}/${product.id}`,
            priceCurrency: "UAH",
            price: product.price,
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "Меблі Ромни",
            },
        },
    };

    // 🔗 Перевірка slug для SEO
    const cleanSlug = transliterateAndClear(product.title);
    if (slug !== cleanSlug) {
        redirect(`/products/${cleanSlug}/${product.id}`);
    }

    return (
        <>
            <ProductDetail
                product={product}
                productProperty={productProperty}
            />
            <Script
                id="json-ld-product"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />
        </>
    );
}

// ======================================================
// 4️⃣ ISR — глобальне revalidate
// ======================================================
export const revalidate = 60;
