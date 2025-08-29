'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { addToCart } from '../actions/addToCart';
import { addToCartTest } from '../utils/CartTest';
import { IPost } from '../types/post';

interface ToastState {
  show: boolean;
  message: string;
}

type LoadingAction = null | 'add' | 'remove';

interface User {
  // вкажи типи user відповідно до свого проєкту
  role?: string;
  [key: string]: unknown;
}


export function useCartActions(user?: User) {
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });

    // Якщо був попередній таймаут — очищаємо
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: '' });
      timeoutRef.current = null;
    }, 2000);
  }, []);

  useEffect(() => {
    // Очищаємо таймаут при демонтажі компонента, щоб уникнути memory leak
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = useCallback(
    async (product: IPost) => {
      try {
        setLoadingAction('add');

        if (!user) {
          addToCartTest(product.id);
        } else {
          await addToCart({ itemId: product.id });
        }

        showToast('Товар додано до кошика!');
      } catch (error) {
        console.error(error);
        showToast('Сталася помилка при додаванні');
      } finally {
        setLoadingAction(null);
      }
    },
    [user, showToast]
  );

  const handleRemoveFromCart = useCallback(
    async (productId: number) => {
      console.log(productId)
      try {
        setLoadingAction('remove');
        // TODO: Виклик API для видалення з кошика
        showToast('Товар видалено з кошика');
      } catch (error) {
        console.error(error);
        showToast('Сталася помилка при видаленні');
      } finally {
        setLoadingAction(null);
      }
    },
    [showToast]
  );

  return {
    loadingAction,
    toast,
    handleAddToCart,
    handleRemoveFromCart,
  };
}
