import React from 'react';
import Link from 'next/link';
import '@/app/styles/footer.scss'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
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
            📍 123 Furniture Street, Suite 100<br />
            📧 mebelshik@gmail.com<br />
            ☎️ +38 096 811 9976
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Manufacture P. All rights reserved.
        </p>
        <div className="footer__socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
