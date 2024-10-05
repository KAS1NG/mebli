'use client'
import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import logoPic from '@/app/public/logo.svg'
import '@/app/styles/header.scss'

const Header = () => {
    const { data: session } = useSession();

    const accessToken = session?.accessToken;
    const user = session?.user;
    const isAdmin = user?.role === 'ROLE_ADMIN';
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="header__container">
                <Link href="/" className="header__logo">
                    <div className='logo__container'>
                        <Image
                            src={logoPic}
                            width={40}
                            height={40}
                            alt="Picture of the author"
                        />
                        <div>
                            Manufacture P
                        </div>
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
                            <Link href="/products">Меблі</Link>
                        </li>
                        <li className="header__item">
                            <Link href="/products?page=1&query=ліжка">Ліжка</Link>
                        </li>
                        <li className="header__item">
                            <Link href="/about">Про нас</Link>
                        </li>
                        <li className="header__item">
                            <Link href="/contact">Контакти</Link>
                        </li>
                        <li className="header__item">
                            <Link href="tel:+380968119976">+380968119976</Link>
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

                {/* Посилання на кошик */}
                <Link href="/cart">
                    <div className="header__cart">
                        🛒 Корзина
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;


// 'use client'
// import Link from 'next/link';
// import { signOut, useSession } from 'next-auth/react';
// import '@/app/styles/header.scss'


// const Header = () => {
//     const { data: session } = useSession();

//     const accessToken = session?.accessToken;
//     const user = session?.user
//     const isAdmin = session?.role === 'ROLE_ADMIN'

//     return (
//         <header className="header">
//             <div className="header__container">
//                 <Link href="/" className="header__logo">
//                     Manufactory Store
//                 </Link>
//                 <nav className="header__nav">
//                     <ul className="header__menu">
//                         <li className="header__item">
//                             <Link href="/products">Products</Link>
//                         </li>
//                         <li className="header__item">
//                             <Link href="/about">About Us</Link>
//                         </li>
//                         <li className="header__item">
//                             <Link href="/contact">Contact</Link>
//                         </li>
//                         {accessToken && (
//                             <li className="header__item">
//                                 <a>{user?.name}</a>
//                             </li>
//                         )}
//                         {accessToken ? (
//                             <li className="header__item">
//                                 <div onClick={() => signOut()}>Logout</div>
//                             </li>
//                         ) :
//                             <li className="header__item">
//                                 <Link href="/auth/login">Login</Link>
//                             </li>
//                         }
//                         {isAdmin &&
//                             <li className="header__item">
//                                 <Link href="/admin/product/create">Create</Link>
//                             </li>
//                         }
//                     </ul>
//                 </nav>
//                 <Link href="/cart">
//                     <div className="header__cart">
//                         🛒 Cart
//                     </div>
//                 </Link>
//             </div>
//         </header>
//     );
// };

// export default Header;

