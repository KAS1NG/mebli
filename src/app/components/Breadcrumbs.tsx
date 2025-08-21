'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Breadcrumbs.module.scss';

// Функція для форматування сегментів URL у красивий текст
function formatBreadcrumb(slug: string): string {
  // Якщо сегмент — лише числа (ID), не показуємо
  if (/^\d+$/.test(slug)) return '';

  // Словник для фіксованих назв
  const dictionary: Record<string, string> = {
    products: 'Каталог',
  };

  if (dictionary[slug]) return dictionary[slug];

  // Автоматичне перетворення slug → текст
  return slug
    .replace(/-/g, ' ') // замінюємо "-" на пробіли
    .replace(/\s+/g, ' ') // прибираємо подвійні пробіли
    .replace(/\b\w/g, c => c.toUpperCase()); // Перша літера кожного слова велика
}

export default function Breadcrumbs() {
  const pathname = usePathname(); 
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 2;

    const label = formatBreadcrumb(segment);
    if (!label) return null; // пропускаємо порожні сегменти (наприклад ID)

    return (
      <li key={href} className={styles.item}>
        {isLast ? (
          <span className={styles.current}>{label}</span>
        ) : (
          <Link href={href} className={styles.link}>
            {label}
          </Link>
        )}
      </li>
    );
  });

  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>Головна</Link>
        </li>
        {crumbs}
      </ul>
    </nav>
  );
}
