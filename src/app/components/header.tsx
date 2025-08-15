'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import logoPic from '@/app/public/logo.svg'
import CategoryDropdown from './CategoryDropdown';
import { categories } from '../utils/categoriesData';
import { fetchCart } from '../actions/fetchCart';
import { IPost } from '../types/post';
import '@/app/styles/header.scss'

const Header = () => {
  const { data: session } = useSession();

  const accessToken = session?.accessToken;
  const user = session?.user;
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const [menuOpen, setMenuOpen] = useState(false);

  const [SOmething, setSOmething] = useState<IPost[]>()

  useEffect( () => {
    const doIt = async () => {
      const products = await fetchCart();
      setSOmething(products)
      return products
    }

    doIt()
  }, [])

  console.log(SOmething && SOmething.length)
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='header'>
      <div className="header__container">
        <Link href="/" className="header__logo">
          <div className='logo__container'>
            <Image
              src={logoPic}
              width={40}
              height={40}
              alt="Picture of the author"
            />
            <h1>
              Меблі Ромни
            </h1>
          </div>
        </Link>

        {/* Іконка гамбургер */}
        <div className={`header__hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Навігаційне меню */}
        <nav className={`header__nav ${menuOpen ? 'active' : ''}`}>
          <ul className="header__menu">
            <li className="header__item">
              <CategoryDropdown categories={categories} />
            </li>
            <li className="header__item">
              <Link href="/about">Про нас</Link>
            </li>
            <li className="header__item">
              <Link href="/contact">Контакти</Link>
            </li>
            {accessToken && (
              <li className="header__item">
                <a>{user?.name}</a>
              </li>
            )}
            {accessToken ? (
              <li className="header__item">
                <div onClick={() => signOut()}>Вийти</div>
              </li>
            ) : (
              <li className="header__item">
                <Link href="/auth/login">Вхід</Link>
              </li>
            )}
            {isAdmin && (
              <li className="header__item">
                <Link href="/admin/product/create">Створити</Link>
              </li>
            )}
          </ul>
        </nav>
        <Link href="/cart">
          <div className="header__cart">
            {/* <span className='cart__count'>{SOmething && SOmething.length != 0 && SOmething.length}0</span> */}
            🛒 Корзина
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;