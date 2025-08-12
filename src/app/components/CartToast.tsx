"use client";

interface Props {
  show: boolean;
}

export default function CartToast({ show }: Props) {
  return (
    <>
      {show && (
        <div className="toast-message">
          Дякуємо за замовлення!
        </div>
      )}
    </>
  );
}
