export const SERVER_URL = process.env.SERVER_URL

export const businessSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Меблі Ромни",
    image: "https://mebliromny.com.ua/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsicero-9aa5f.appspot.com%2Fo%2Fab6b1568-5878-4e76-ad1b-86f3373bd3ce.jpg%3Falt%3Dmedia&w=1920&q=75",
    url: "https://mebliromny.com.ua",
    logo: "https://firebasestorage.googleapis.com/v0/b/sicero2-bfcd2.appspot.com/o/%D1%96%D0%B2%D0%BC.png?alt=media&token=2b8720fb-8f77-45fa-964c-0a2e1de81e7f",
    telephone: "+380503073436",
    address: {
        "@type": "PostalAddress",
        streetAddress: "1-й провулок Свободи, 10",
        addressLocality: "Ромни",
        addressRegion: "Сумська область",
        postalCode: "42000",
        addressCountry: "UA",
    },
    openingHours: "Mo-Sa 09:00-18:00",
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