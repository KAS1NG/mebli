'use client';
import { memo, useEffect, useMemo } from 'react';
import clsx from 'clsx';

interface CartToastProps {
  show: boolean;
  message?: string;
}

const CartToast = memo(({ show, message = 'Товар додано до кошика!' }: CartToastProps) => {
  useEffect(() => {
    if (show) {
      // Додатково можна додати аналітику або логування
    }
  }, [show]);

  const toastClass = useMemo(
    () =>
      clsx(
        'fixed left-4 bottom-4 px-4 py-3 rounded-xl shadow-lg text-white text-sm transition-all duration-300 transform',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none',
        'bg-green-500'
      ),
    [show]
  );

  return (
    <div className={toastClass} role="status" aria-live="polite">
      {message}
    </div>
  );
});

CartToast.displayName = 'CartToast';
export default CartToast;
