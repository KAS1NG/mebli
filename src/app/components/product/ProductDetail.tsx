'use client';

import dynamic from 'next/dynamic';
import MySlider from '@/app/components/slider';
import { useSession } from 'next-auth/react';
import { IPost, IGetProperty } from '../../types/post';
import { stringToArray } from '../../utils/stringToArr';
import { useCartActions } from '@/app/hooks/useCartActions';

const ProductActions = dynamic(() => import('./ProductActions'), { ssr: false });
const CartToast = dynamic(() => import('./CartToast'), { ssr: false });
const AddProductProperties = dynamic(() => import('../AddProductProperties'), { ssr: false });
const ProductProperties = dynamic(() => import('./ProductProperties'), { ssr: false });
const ProductTags = dynamic(() => import('./ProductTags'), { ssr: false });

interface ProductDetailProps {
    product: IPost;
    productProperty: IGetProperty[];
}

export default function ProductDetail({ product, productProperty }: ProductDetailProps) {
    const { data: session } = useSession();
    const user = session?.user;
    const isAdmin = user?.role === 'ROLE_ADMIN';
    const tagsArray = stringToArray(product.tags || '');

    const { loadingAction, toast, handleAddToCart, handleRemoveFromCart } = useCartActions(user);

    return (
        <main className="product_container">
            <div className="product-page">
                <MySlider slides={product.images} title={product.title} />

                <section className="product-page__info">
                    <h1 className="product-page__title">{product.title}</h1>
                    <p className="product-page__description">{product.description}</p>
                    <p className="product-page__price">Ціна: {product.price} ₴</p>

                    <ProductProperties properties={productProperty} isAdmin={isAdmin} />
                    <ProductTags tags={tagsArray} />

                    {isAdmin && <AddProductProperties productId={product.id} />}

                    <ProductActions
                        productId={product.id}
                        isAdmin={isAdmin}
                        loadingAction={loadingAction}
                        onAdd={() => handleAddToCart(product.id)}
                        onRemove={() => handleRemoveFromCart(product.id)}
                    />

                    <CartToast show={toast.show} message={toast.message} />
                </section>
            </div>
        </main>
    );
}
