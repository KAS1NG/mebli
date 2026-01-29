export const SERVER_URL = process.env.SERVER_URL
export const productLimit = '9'

export const categories = [
    { name: 'Нове', mainUrl: '/products', href: '/products?page=1' },
    { name: 'Знижки', mainUrl: '/products/znizhky', href: '/products/znizhky?page=1&query=знижка' },
    { name: 'Дивани', mainUrl: '/products/divany', href: '/products/divany?page=1&query=диван' },
    { name: 'Крісла', mainUrl: '/products/krisla', href: '/products/krisla?page=1&query=крісло' },
    { name: 'Стільці', mainUrl: '/products/stilci', href: '/products/stilci?page=1&query=стілець' },
    { name: 'Ліжка', mainUrl: '/products/lizhka', href: '/products/lizhka?page=1&query=ліжко' },
    { name: 'Шафи', mainUrl: '/products/shafi', href: '/products/shafi?page=1&query=шафа' },
    { name: 'Столи', mainUrl: '/products/stoly', href: '/products/stoly?page=1&query=стіл' },
    { name: 'Матраци', mainUrl: '/products/matrats', href: '/products/matrats?page=1&query=матрац' },
    { name: 'Тумби', mainUrl: '/products/tumbs', href: '/products/tumbs?page=1&query=тумба' },
    { name: 'Комоди', mainUrl: '/products/komods', href: '/products/komods?page=1&query=комод' },
];

export const businessSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Меблі Ромни",
    image: "https://mebliromny.com.ua/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsicero-9aa5f.appspot.com%2Fo%2Fab6b1568-5878-4e76-ad1b-86f3373bd3ce.jpg%3Falt%3Dmedia&w=1920&q=75",
    url: "https://mebliromny.com.ua",
    logo: "https://mebliromny.com.ua/favicon-512.png",
    telephone: "+380503073436",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Бульвар Свободи, 24",
        addressLocality: "Ромни",
        addressRegion: "Сумська область",
        postalCode: "42000",
        addressCountry: "UA",
    },
    openingHours: "Mo-Su 09:00-17:00",
    sameAs: [
        "https://www.facebook.com/share/1EVjeSnw7c/",
        "https://www.instagram.com/manuf4cture_p",
    ],
};

export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Чи доставляєте меблі по Сумській області?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Так, ми доставляємо меблі у Ромнах та по всій Сумській області.",
            },
        },
        {
            "@type": "Question",
            name: "Чи можна замовити меблі під індивідуальні розміри?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Так, ми виготовляємо кухні, шафи-купе та інші меблі під ваші індивідуальні розміри.",
            },
        },
    ],
};