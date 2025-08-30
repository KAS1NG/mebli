'use client';
import { useCartActions } from '@/app/hooks/useCartActions';
import CartToast from '../CartToast';
import { removePost } from '@/app/actions/removePost';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import style from '../../styles/product/ProductActionsWrapper.module.scss'
import { IPost } from '@/app/types/post';
import { useCart } from '@/app/context/CartContext';

interface User {
    role?: string;
    [key: string]: unknown;
}

interface Props {
    product: IPost;
    user?: User;
}

export default function ProductActionsWrapper({ product, user }: Props) {
    const { showToast, toast } = useCartActions(user);

    const { addProduct } = useCart();

    const handleAddToCart = (product: IPost) => {
        addProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.images[0]
        })
        showToast('Товар додано до кошика!');
    }

    const router = useRouter();

    const isAdmin = user?.role === 'ROLE_ADMIN';

    const handleDelete = useCallback(() => {
        removePost(product.id);
    }, [product]);

    const handleEdit = useCallback(() => {
        router.push(`/admin/product/update/${product.id}`);
    }, [product, router]);

    return (
        <div className={style.actions}>
            <button
                // disabled={loadingAction === 'add'}
                onClick={() => handleAddToCart(product)}
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
