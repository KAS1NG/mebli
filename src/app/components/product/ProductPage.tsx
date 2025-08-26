"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { IPreviewPost } from "@/app/types/post";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Image from 'next/image';
import { transliterateAndClear } from "@/app/utils/clearUrlString";
import styles from "../../styles/product/ProductPage.module.scss";
import Script from "next/script";

interface IProductPage {
    invoices: IPreviewPost[]
    currentProductId: number
}

export default function ProductPage({ invoices, currentProductId }: IProductPage) {

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": invoices.map((p, index) => ({
            "@type": "Product",
            "position": index + 1,
            "name": p.title,
            "image": p.thumbnail,
            "offers": {
                "@type": "Offer",
                "price": p.price,
                "priceCurrency": "UAH",
                "availability": "https://schema.org/InStock"
            }
        }))
    };

    return (
        <>
            <div className={styles.page}>
                <div className={styles.recommendedSection}>
                    <h3>тобі може сподобатись</h3>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={20}
                        breakpoints={{
                            0: { slidesPerView: 1.2 },
                            480: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className={styles.swiperContainer}
                        aria-label="Карусель рекомендованих товарів"
                    >
                        <style jsx>{`
        /* Workaround для SSR layout stability */
        .${styles.swiperContainer} .swiper-slide {
          width: calc((100% - 3 * 20px) / 4); /* 4 слайди у 1024+ */
        }
        @media (max-width: 767px) {
          .${styles.swiperContainer} .swiper-slide {
            width: calc((100% - 1 * 20px) / 2); /* 2 слайди */
          }
        }
      `}
                        </style>
                        {invoices.map((p) => (
                            p.id !== currentProductId &&
                            <SwiperSlide key={p.id}>
                                <Link
                                    href={`/products/${transliterateAndClear(p.title)}/${p.id}`}
                                    prefetch={false}>
                                    <div className={styles.card}>
                                        <Image
                                            src={p.thumbnail}
                                            alt={p.title}
                                            width={320}      // можна підлаштувати під дизайн
                                            height={280}     // зберігаємо пропорції
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            priority={false} // true — якщо картка завжди на екрані при рендері
                                            loading="lazy"
                                        />
                                        <p className={styles.name}>{p.title}</p>
                                        <p className={styles.price}>{p.price} ₴</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <Script
                id="recommended-products-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
