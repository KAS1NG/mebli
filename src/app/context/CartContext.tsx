"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { IPreviewPost } from "../types/post";
import { fetchCart } from "../actions/fetchCart";
import { addToCartTest, removeFromCart, CART_COOKIE_NAME } from "../utils/CartTest";


type CartContextType = {
    cartItems: IPreviewPost[];
    addProduct: (product: IPreviewPost) => void;
    removeProductFromCart: (id: string) => void;
    clearCart: () => void;
    incrementProduct: (id: number) => void;
    decrementProduct: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<IPreviewPost[]>([]);

    // ✅ завантажуємо з кукі при першому рендері
    useEffect(() => {
        (async () => {
            const products: IPreviewPost[] = await fetchCart();
            setCartItems(products);
        })();
    }, []);

    // ✅ оновлюємо кукі коли змінюється кошик
    useEffect(() => {
        Cookies.set("cart", JSON.stringify(cartItems), { expires: 7 }); // 7 днів збереження
    }, [cartItems]);

    const addProduct = (product: IPreviewPost) => {
        setCartItems((prev) => [...prev, product]);
        addToCartTest(product.id);
    };

    const removeProductFromCart = (id: string) => {
        const productId = Number(id);

        // Видаляємо всі входження з Cookies
        const raw = Cookies.get(CART_COOKIE_NAME);
        if (raw) {
            const ids: number[] = JSON.parse(raw);
            const filtered = ids.filter((x) => x !== productId);
            Cookies.set(CART_COOKIE_NAME, JSON.stringify(filtered), { expires: 7 });
        }

        // Видаляємо всі дублікати з локального state
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const clearCart = () => setCartItems([]);

    const incrementProduct = (id: number) => {
        const product = cartItems.find(item => item.id === id);
        if (product) {
            // додаємо ще одну копію того ж продукту
            setCartItems((prev) => [...prev, product]);
        }
        addToCartTest(id);
    };

    const decrementProduct = (id: number) => {
        setCartItems((prev) => {
            const index = prev.findIndex(item => item.id === id);
            if (index !== -1) {
                const newItems = [...prev];
                newItems.splice(index, 1); // видаляємо лише одну копію
                return newItems;
            }
            return prev;
        });
        removeFromCart(id)
    };

    return (
        <CartContext.Provider value={{ cartItems, addProduct, removeProductFromCart, clearCart, incrementProduct, decrementProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
};
