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
        img: "https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/08f79ca8-2e56-497d-9360-4e4c98a0c95e.png?alt=media",
    },
    {
        title: "Стільці",
        href: "/products?page=1&query=стілець",
        img: "https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/0b8a7bc3-26ed-4e29-be76-7dd3643a4cb5.jpg?alt=media",
    },
    {
        title: "Шафи | Комоди",
        href: "/products?page=1&query=шафа-купе,комод",
        img: "https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/6b612752-b720-48e6-a3f6-5b6fe023ff2c.png?alt=media",
    },
    {
        title: "Дивани",
        href: "/products?page=1&query=диван,крісло,пуф",
        img: "https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/7cb6e098-ea80-4f1d-8a6e-27c081ca9ba6.jpg?alt=media",
    },
    {
        title: "Столи",
        href: "/products?page=1&query=кухня,кухнонний,стіл",
        img: "https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/a278e240-b678-446b-9cac-a0ca3426e5a8.jpg?alt=media",
    },
    {
        title: "Ліжка",
        href: "/products?page=1&query=ліжко",
        img: "https://firebasestorage.googleapis.com/v0/b/sicero-9aa5f.appspot.com/o/f4d11a21-15cd-4a17-a7df-dd5471f73a08.png?alt=media",
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
