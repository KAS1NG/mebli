// 'use client'
// import Link from 'next/link';
// import { useState } from 'react';
// import { signOut, useSession } from 'next-auth/react';
// import Image from 'next/image';
// import logoPic from '@/app/public/logo.svg'
// import { usePathname } from 'next/navigation';
// import styles from '../styles/Header.module.scss';
// import CartHoverModal from '../cart/CartHoverModal';
// import { useCart } from '../../context/CartContext';
// import { categories } from '../../lib/constants';

// const Header = () => {
//   const { data: session } = useSession();

//   const accessToken = session?.accessToken;
//   const user = session?.user;
//   const isAdmin = user?.role === 'ROLE_ADMIN';
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { cartItems } = useCart();

//   const router = usePathname();

//   return (
//     <header className={`${styles.header} ${menuOpen ? styles.open : ''}`}>
//       <div className={styles.container}>
//         <div className={styles.left}>
//           <Link href="/" className={styles.logo__container}>
//             <Image
//               src={logoPic}
//               width={40}
//               height={40}
//               alt="Меблі Ромни"
//               className={styles.logo}
//             />
//             <span className={styles.brand}>Меблі Ромни</span>
//           </Link>
//         </div>

//         <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
//           <Link href="/about">Про нас</Link>
//           <Link href="/contact">Контакти</Link>
//           {accessToken ? (
//             <Link href="#" onClick={() => signOut()}>Вийти</Link>
//           ) : (
//             <Link href="/auth/login">Вхід</Link>
//           )}
//           {isAdmin && (
//             <Link href="/admin/product/create">Створити</Link>
//           )}
//         </nav>

//         <div className={styles.right}>
//           <button
//             className={styles.burger}
//             aria-label="Відкрити меню"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span />
//             <span />
//             <span />
//           </button>
//           <Link href="/cart" className={styles.cart}>
//             <CartHoverModal products={cartItems} />
//           </Link>
//         </div>
//       </div>

//       <div className={styles['categories-wrapper']}>
//         <div className={styles.categories}>
//           {categories.map((cat) => (
//             <Link
//               key={cat.href}
//               href={cat.href}
//               className={`${styles.category} ${router === cat.mainUrl ? styles.active : ''}`}>
//               {cat.name}
//             </Link>
//           ))}
//         </div>
//       </div>

//     </header>
//   );
// };

// export default Header;