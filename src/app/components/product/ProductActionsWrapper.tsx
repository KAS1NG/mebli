'use client';
import { useCartActions } from '@/app/hooks/useCartActions';
import CartToast from '../CartToast';
import { removePost } from '@/app/actions/removePost';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import style from '../../styles/product/ProductActionsWrapper.module.scss'

interface User {
  // вкажи типи user відповідно до свого проєкту
  role?: string;
  [key: string]: unknown;
}

interface Props {
    productId: number;
    user?: User;
}

export default function ProductActionsWrapper({ productId, user }: Props) {
    const { loadingAction, handleAddToCart, toast } = useCartActions(user);

    const router = useRouter();

    const isAdmin = user?.role === 'ROLE_ADMIN';

    const handleDelete = useCallback(() => {
        removePost(productId);
    }, [productId]);

    const handleEdit = useCallback(() => {
        router.push(`/admin/product/update/${productId}`);
    }, [productId, router]);

    return (
        <div className={style.actions}>
            <button
                disabled={loadingAction === 'add'}
                onClick={() => handleAddToCart(productId)}
                className={style.buttons}
            >
                <span>Додати до кошика</span>
            </button>

            {isAdmin && (
                <>
                    <button
                        className={style.buttons}
                        onClick={handleDelete}
                        aria-label="Видалити товар"
                    >
                        <span>🗑 Видалити</span>
                    </button>

                    <button
                        className={style.buttons}
                        onClick={handleEdit}
                        aria-label="Редагувати товар"
                    >
                        <span>✏ Редагувати</span>
                    </button>
                </>
            )}

            <CartToast show={toast.show} msg={toast.message} />
        </div>
    );
}
