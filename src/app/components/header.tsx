'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import logoPic from '@/app/public/logo.svg'
import { fetchCart } from '../actions/fetchCart';

import styles from '../styles/Header.module.scss';
import { usePathname } from 'next/navigation';


const Header = () => {
  const { data: session } = useSession();

  const accessToken = session?.accessToken;
  const user = session?.user;
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const doIt = async () => {
      const products = await fetchCart();
      // setSOmething(products)
      return products
    }

    doIt()
  }, [])

  const router = usePathname();

  const categories = [
    { name: 'Дивани', mainUrl: '/products/divany', href: '/products/divany?page=1&query=диван' },
    { name: 'Крісла', mainUrl: '/products/krisla', href: '/products/krisla?page=1&query=крісло' },
    { name: 'Стільці', mainUrl: '/products/stilci', href: '/products/stilci?page=1&query=стілець' },
    { name: 'Ліжка', mainUrl: '/products/lizhka', href: '/products/lizhka?page=1&query=ліжко' },
    { name: 'Шафи', mainUrl: '/products/shafi', href: '/products/shafi?page=1&query=шафа' },
    { name: 'Столи', mainUrl: '/products/stoly', href: '/products/stoly?page=1&query=стіл' },
  ];

  return (
    <header className={`${styles.header} ${menuOpen ? styles.open : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo__container}>
            <Image
              src={logoPic}
              width={40}
              height={40}
              alt="Меблі Ромни"
              className={styles.logo}
            />
            <span className={styles.brand}>Меблі Ромни</span>
          </Link>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
          <Link href="/about">Про нас</Link>
          <Link href="/contact">Контакти</Link>
          {accessToken ? (
            <Link href="#" onClick={() => signOut()}>Вийти</Link>
          ) : (
            <Link href="/auth/login">Вхід</Link>
          )}
          {isAdmin && (
            <Link href="/admin/product/create">Створити</Link>
          )}
        </nav>

        <div className={styles.right}>
          <button
            className={styles.burger}
            aria-label="Відкрити меню"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
          <Link href="/cart" className={styles.cart}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="..." /></svg>
            <span>Кошик</span>
          </Link>
        </div>
      </div>
      <div className={styles['categories-wrapper']}>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`${styles.category} ${router === cat.mainUrl ? styles.active : ''}`}>
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

    </header>
  );
};

export default Header;