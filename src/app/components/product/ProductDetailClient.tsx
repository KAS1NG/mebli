"use client";

import { motion } from "framer-motion";
import { IGetProperty, IPost } from "@/app/types/post";
import { ShoppingCart } from "lucide-react";
import DeliveryInfo from "./DeliveryInfo";
import style from '../../styles/product/ProductDetail.module.scss'
import ProductProperties from "./ProductProperties";
import ProductTags from "./ProductTags";
import { useCart } from "@/app/context/CartContext";
import { useCartActions } from "@/app/hooks/useCartActions";
import CartToast from "../CartToast";
import { useCallback } from "react";
import { removePost } from "@/app/actions/removePost";
import { useRouter } from "next/navigation";

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

    const { showToast, toast } = useCartActions(user);

    const { addProduct } = useCart();

    const router = useRouter();

    const handleAddToCart = (product: IPost) => {
        addProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.images[0]
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
            <h1 className={style.title}>{product.title}</h1>
            <p className={style.description}>{product.description}</p>
            <ProductTags tags={tags} />
            <div className={style.priceRow}>
                <span className={style.price}>₴ {product.price} грн</span>
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
            <ProductProperties properties={productProperty} isAdmin={isAdmin} />
            <DeliveryInfo />
            <CartToast show={toast.show} msg={toast.message} />
        </motion.section>
    );
}
