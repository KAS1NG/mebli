"use client";

import { motion } from "framer-motion";
import { IGetProperty, IPost } from "@/app/types/post";
import { Flame, ShoppingCart } from "lucide-react";
import DeliveryInfo from "./DeliveryInfo";
import ProductProperties from "./ProductProperties";
import ProductTags from "./ProductTags";
import { useCart } from "@/app/context/CartContext";
import { useCartActions } from "@/app/hooks/useCartActions";
import CartToast from "../CartToast";
import { useCallback } from "react";
import { removePost } from "@/app/actions/removePost";
import { useRouter } from "next/navigation";
import AddProductProperties from "../AddProductProperties";
import { useSession } from "next-auth/react";
import style from '../../styles/product/ProductDetail.module.scss'

interface User {
    role?: string;
    [key: string]: unknown;
}

interface ProductDetailClientProps {
    product: IPost,
    isAdmin: boolean,
    productProperty: IGetProperty[];
    tags: string[];
    user?: User;
}

export default function ProductDetailClient({ product, isAdmin, productProperty, tags, user }: ProductDetailClientProps) {

    const { data: session } = useSession();
    const { accessToken } = session || {};

    const { showToast, toast } = useCartActions(user);

    const { addProduct } = useCart();

    const router = useRouter();

    const handleAddToCart = (product: IPost) => {
        addProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.images[0],
            brand: product.brand
        })
        showToast('Товар додано до кошика!');
    }

    const handleDelete = useCallback(() => {
        removePost(product.id);
    }, [product]);

    const handleEdit = useCallback(() => {
        router.push(`/admin/product/update/${product.id}`);
    }, [product, router]);

    return (
        <motion.section
            className={style.info}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {product.brand && product.brand / 100 !== 0 &&
                <span className={`${style.label} ${style.sale}`}>
                    <span>Знижка</span> <Flame size={16} />
                </span>
            }
            <h1 className={style.title}>{product.title}</h1>
            <p className={style.description}>{product.description}</p>
            <ProductTags tags={tags} />
            <div className={style.priceRow}>
                {product.brand == 0 && <span className={style.price}>₴ {product.price.toLocaleString('uk-UA')} грн</span>}
                {!product.brand && <span className={style.price}>₴ {product.price.toLocaleString('uk-UA')} грн</span>}

                {product.brand && product.brand / 100 !== 0 &&
                    <div className={style.priceWrapper}
                        title={`Економія ${product.price * product.brand} грн`}
                    >
                        <span className={style.oldPrice}>{product.price.toLocaleString('uk-UA')} грн</span>
                        <span className={style.newPrice}>{(product.price - product.price * product.brand).toLocaleString('uk-UA')} грн</span>
                        {product.price && (
                            <span className={style.discount}>
                                -{Math.round(product.brand * 100)}%
                            </span>
                        )
                        }
                    </div>}

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={style.addToCart}
                    onClick={() => handleAddToCart(product)}
                >
                    <ShoppingCart size={18} />
                    Додати в кошик
                </motion.button>
                {isAdmin && (
                    <>
                        <button
                            className={style.deleteBtn}
                            onClick={handleDelete}
                            aria-label="Видалити товар"
                        >
                            <span>🗑 Видалити</span>
                        </button>

                        <button
                            className={style.editBtn}
                            onClick={handleEdit}
                            aria-label="Редагувати товар"
                        >
                            <span>✏ Редагувати</span>
                        </button>
                    </>
                )}
            </div>
            <ProductProperties properties={productProperty} isAdmin={isAdmin} accessToken={accessToken} />
            {isAdmin && (
                <AddProductProperties productId={product.id} accessToken={accessToken} />
            )}
            <DeliveryInfo />
            <CartToast show={toast.show} msg={toast.message} />
        </motion.section>
    );
}
