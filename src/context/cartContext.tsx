'use client'

import React, { createContext, useState } from "react";

type Cart = { [id : number] :number };

const CartContext = createContext <{
    cart: Cart;
    addToCart: (id: number) => void;
    updateQuantity: (id: number, qty: number) => void;
}>({
    cart: {},
    addToCart: () => {},
    updateQuantity: () => {},
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<Cart>({});

    const addToCart = (id : number) => {
        setCart(prev => ({...prev, [id]: (prev[id] || 0) + 1}));
    }

    const updateQuantity = (id: number, qty: number) => {
        setCart(prev => ({...prev, [id]: Math.max(qty, 0)}));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => React.useContext(CartContext);