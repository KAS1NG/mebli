"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { IPost } from "../types/post";
import { fetchCart } from "../actions/fetchCart";

type Product = {
    id: number,
    title: string,
    description: string,
    price: number,
    createdAt: string,
    updatedAt: string,
    views: number,
    tags: string,
    images: string[]
};

type CartContextType = {
    cartItems: Product[];
    addProduct: (product: Product) => void;
    removeProductFromCart: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    // ✅ завантажуємо з кукі при першому рендері
    useEffect(() => {
        const savedCart = Cookies.get("cart_ids");
        if (savedCart) {
            try {
                async function f1() {
                    const products: IPost[] = await fetchCart();
                    setCartItems(products);
                }
                f1()
            } catch (e) {
                console.error("Помилка читання кошика з кукі", e);
            }
        }
    }, []);

    // ✅ оновлюємо кукі коли змінюється кошик
    useEffect(() => {
        Cookies.set("cart", JSON.stringify(cartItems), { expires: 7 }); // 7 днів збереження
    }, [cartItems]);

    const addProduct = (product: Product) => {
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
