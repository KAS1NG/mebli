'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X } from 'lucide-react';

import styles from '../styles/Modal.module.scss';

interface ModalProps {
  selectedImage: string;
  closeModal: () => void;
}

export default function Modal({ selectedImage, closeModal }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={styles.modal}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={closeModal}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className={styles.modal__close}
          aria-label="Закрити"
        >
          <X size={32} />
        </button>

        <Image
          src={selectedImage}
          alt="Перегляд зображення"
          width={1000}
          height={800}
          className={styles.modal__image}
          sizes="(max-width: 768px) 100vw, 1000px"
        />
      </div>
    </div>,
    document.body
  );
}
