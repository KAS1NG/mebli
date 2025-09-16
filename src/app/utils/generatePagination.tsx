'use client';
import Link from 'next/link';
import styles from '../styles/Pagination.module.scss';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  query?: string;
  param?: string;
}

export default function Pagination({
  totalPages,
  currentPage = 1,
  query = '',
  param = '',
}: PaginationProps) {

  const getHref = (pageOffset: number) =>
    `/products/${param}?page=${currentPage + pageOffset}${query ? '&query=' + query : ''}`;

  console.log(getHref(-1))

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
          href={isFirstPage ? '#' : getHref(-1)}
          aria-label="Go to previous page"
          className={styles.pagination__button}
          aria-disabled={isFirstPage}
          tabIndex={isFirstPage ? -1 : 0}
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
          href={isLastPage ? '#' : getHref(+1)}
          aria-label="Go to next page"
          className={styles.pagination__button}
          aria-disabled={isLastPage}
          tabIndex={isLastPage ? -1 : 0}
        >
          <ChevronRight size={20} />
        </Link>
      </motion.div>
    </motion.nav>
  );
}
