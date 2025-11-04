"use client";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import styles from "../styles/CategoryGrid.module.scss";
import Image from 'next/image';

type Category = {
    title: string;
    href: string;
    img: string;
    badge?: string;
};

const categories: Category[] = [
    {
        title: "Офіс",
        href: "/products?page=1&query=офіс",
        img: "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1762240595/535118c1-17d3-4157-b374-542782b7d9ac.webp",
    },
    {
        title: "Стільці",
        href: "/products?page=1&query=стілець",
        img: "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1762240594/7a8f3daa-a4dc-4a56-9aa2-4ff3677a5189.webp",
    },
    {
        title: "Шафи | Комоди",
        href: "/products?page=1&query=шафа-купе,комод",
        img: "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1762240592/431147c8-49a5-4561-aeac-edc31f5ff772.webp",
    },
    {
        title: "Дивани",
        href: "/products?page=1&query=диван,крісло,пуф",
        img: "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1762240591/d710276e-f44c-4217-900d-a7ca84006a9a.webp",
    },
    {
        title: "Столи",
        href: "/products?page=1&query=кухня,кухнонний,стіл",
        img: "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1762240590/1b24e60c-180b-473b-87f4-0b8e045bd5f1.webp",
    },
    {
        title: "Ліжка",
        href: "/products?page=1&query=ліжко",
        img: "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1762240588/8cc770a0-1563-4cb3-b124-e21c5395f1ea.webp",
        badge: "Топ пропозиція",
    },
];

export default function CategoryGrid() {
    return (
        <div className={styles.wrap}>
            <div className={styles.grid}>
                {categories.map((cat) => (
                    <Link key={cat.title} href={cat.href} className={styles.card}>
                        {cat.badge && <span className={styles.badge}>{cat.badge}</span>}
                        <Image
                            src={cat.img}
                            alt={cat.title}
                            width={300}
                            height={200}
                            quality={90}
                        />
                        <span className={styles.cta}>
                            {cat.title} <ArrowRight className={styles.arrow} size={16} />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
