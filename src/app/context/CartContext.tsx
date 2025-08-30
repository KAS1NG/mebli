"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { IPreviewPost } from "../types/post";
import { fetchCart } from "../actions/fetchCart";

type CartContextType = {
    cartItems: IPreviewPost[];
    addProduct: (product: IPreviewPost) => void;
    removeProductFromCart: (id: string) => void;
    clearCart: () => void;
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
    };

    const removeProductFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== Number(id)));
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addProduct, removeProductFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
};
