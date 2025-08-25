import React from 'react';
import Link from 'next/link';
import '@/app/styles/footer.scss'
import Script from 'next/script';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container-inner">
        <div className="footer__container">
          <div className="footer__column">
            <h4 className="footer__heading">Про нас</h4>
            <p className="footer__text">
              Надаємо високоякісні меблі, які поєднують стиль із функціональністю. Відкрийте для себе широкий асортимент нашої продукції!
            </p>
          </div>
          <div className="footer__column">
            <h4 className="footer__heading">Швидкі посилання</h4>
            <ul className="footer__links">
              <li><Link href="/about">Про нас</Link></li>
              <li><Link href="/products">Меблі</Link></li>
              <li><Link href="/contact">Контакти</Link></li>
            </ul>
          </div>
          <div className="footer__column">
            <h4 className="footer__heading">Контактна інформація</h4>
            <p className="footer__text">
              м. Ромни, 1-й провулок Свободи, 10<br />
              mebelshuk@gmail.com<br />
              +38 050 307 34 36
            </p>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Mebli Romny. All rights reserved.
        </p>
        <div className="footer__socials">
          <Link href="https://www.facebook.com/share/1EVjeSnw7c/" target="_blank" rel="noopener noreferrer">Facebook</Link>
          <Link href="https://www.instagram.com/manuf4cture_p" target="_blank" rel="noopener noreferrer">Instagram</Link>
        </div>
      </div>

      <Script id="ld-local" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FurnitureStore",
            name: "Mebli Romny",
            url: "https://mebliromny.com.ua",
            telephone: "+380503073436",
            address: { "@type": "PostalAddress", addressCountry: "UA", addressLocality: "Ромни", streetAddress: "1-й провулок Свободи, 10" },
            areaServed: "Сумська область",
            openingHours: "Mo-Fr 09:00-18:00",
            sameAs: ["https://www.facebook.com/share/1EVjeSnw7c/", "https://www.instagram.com/manuf4cture_p"]
          })
        }}
      />

    </footer>
  );
};

export default Footer;
