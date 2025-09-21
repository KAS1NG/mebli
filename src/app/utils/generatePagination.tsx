'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from '../styles/Pagination.module.scss';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <motion.nav
      aria-label="Pagination Navigation"
      className={styles.pagination}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
        <Link
          href={createPageURL(currentPage > 1 ? currentPage - 1 : 1)}
          aria-label="Go to previous page"
          className={styles.pagination__button}
          aria-disabled={isFirstPage}
          tabIndex={isFirstPage ? -1 : 0}
          prefetch
        >
          <ChevronLeft size={20} />
        </Link>
      </motion.div>

      <motion.span
        className={styles.pagination__info}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
      >
        {currentPage} / {totalPages}
      </motion.span>

      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
        <Link
          href={createPageURL(
            currentPage < totalPages ? currentPage + 1 : totalPages
          )}
          aria-label="Go to next page"
          className={styles.pagination__button}
          aria-disabled={isLastPage}
          tabIndex={isLastPage ? -1 : 0}
          prefetch
        >
          <ChevronRight size={20} />
        </Link>
      </motion.div>
    </motion.nav>
  )
}
