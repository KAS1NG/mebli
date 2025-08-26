// 'use client';

// import React, { memo, useCallback, useMemo, useState } from 'react';
// import { removePost } from '../../actions/removePost';
// import { useRouter } from 'next/navigation';
// import clsx from 'clsx';
// import { ShoppingCart } from 'lucide-react';
// import dynamic from 'next/dynamic';

// const CartToast = dynamic(() => import('../../components/CartToast'), { ssr: false });

// interface ProductActionsProps {
//   productId: number;
//   isAdmin: boolean;
//   loadingAction: null | 'add' | 'remove';
//   onAdd: () => void;
//   onRemove: () => void;
// }

// const ProductActions = memo(function ProductActions({
//   productId,
//   isAdmin,
//   loadingAction,
//   onAdd,
//   // onRemove,
// }: ProductActionsProps) {
//   const router = useRouter();

//   const [showToast] = useState(false);

//   // Функції обробники обгортаємо useCallback — щоб не створювати заново
//   const handleDelete = useCallback(() => {
//     removePost(productId);
//   }, [productId]);

//   const handleEdit = useCallback(() => {
//     router.push(`/admin/product/update/${productId}`);
//   }, [productId, router]);

//   // Опціонально мемоізуємо класи, якщо хочеш
//   const addBtnClass = useMemo(
//     () => clsx('product-page__btn', 'product-page__btn--add-to-cart'),
//     []
//   );
//   // const removeBtnClass = useMemo(
//   //   () => clsx('product-page__btn', 'product-page__btn--remove-from-cart'),
//   //   []
//   // );
//   const deleteBtnClass = useMemo(
//     () => clsx('product-page__btn', 'product-page__btn--delete-btn'),
//     []
//   );
//   const editBtnClass = useMemo(
//     () => clsx('product-page__btn', 'product-page__btn--view-3d'),
//     []
//   );

//   return (
//     <div className="product-page__buttons">
//       <button
//         className={addBtnClass}
//         onClick={onAdd}
//         disabled={loadingAction === 'add'}
//         aria-label="Додати товар до кошика">
//         {loadingAction === 'add' ? 'Завантаження...' :
//           <span className='btn__contant'>
//             <span>Додати в кошик</span>
//             <ShoppingCart size={16} />
//           </span>}
//       </button>

//       {isAdmin && (
//         <>
//           <button
//             className={deleteBtnClass}
//             onClick={handleDelete}
//             aria-label="Видалити товар"
//           >
//             🗑 Видалити
//           </button>

//           <button
//             className={editBtnClass}
//             onClick={handleEdit}
//             aria-label="Редагувати товар"
//           >
//             ✏ Редагувати
//           </button>
//         </>
//       )}
//       <CartToast show={showToast} msg="Товар додано" />
//     </div>
//   );
// });

// ProductActions.displayName = 'ProductActions';

// export default ProductActions;
