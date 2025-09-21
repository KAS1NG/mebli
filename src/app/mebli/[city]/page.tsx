import { RegionKey, regions } from "@/app/lib/regions";
import style from '../../styles/regionPage.module.scss'
import Link from "next/link";

export async function generateStaticParams() {
    return Object.keys(regions).map((city) => ({ city }));
}

type Params = { city: RegionKey };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { city } = await params;   // ⬅️ спочатку розпаковуємо
    const region = regions[city];    // ⬅️ доступаємося до regions по ключу
    if (!region) return {}
    return {
        title: region.title,
        description: region.description,
        alternates: {
            canonical: `https://mebliromny.com.ua/mebli/${region.slug}/`,
        }
    }
}

export default async function RegionPage({ params }: { params: Promise<Params>  }) {

    const { city } = await params;   // ⬅️ спочатку розпаковуємо
    const region = regions[city];    // ⬅️ доступаємося до regions по ключу

    if (!region) {
        return <h1>Регіон не знайдено</h1>;
    }

    const categories = [
        { name: 'Меблі Ромни', href: '/mebli/romny' },
        { name: 'Меблі Суми', href: '/mebli/sumy' },
        { name: 'Меблі Шостка', href: '/mebli/shostka' },
        { name: 'Меблі Конотоп', href: '/mebli/konotop' },
    ];

    return (
        <main className={style.regionPage}>
            <div className={style.container}>
                <div className={style['categories-wrapper']}>
                    <div className={style.categories}>
                        {categories.map((cat) => (
                            <Link
                                key={cat.href}
                                href={cat.href}
                                className={`${style.category}`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <h1>{region.h1}</h1>
                <p>{region.description}</p>
                <div className={style.contacts__block}>
                    <h2>Телефони</h2>
                    <ul>
                        <li><a href="tel:+380501234567">+38 (050) 307-34-36</a></li>
                        <li><a href="tel:+380971234567">+38 (096) 811-99-76</a></li>
                    </ul>
                </div>
                <p>
                    {region.seoText}
                </p>
                <Link
                    href={'/products'}
                    className={style.addToCart}
                >
                    До каталогу
                </Link>
            </div>
        </main>
    )
}
