'use client'

import React, { createContext, useState, useEffect } from "react";
import { products } from "@/data/product";

type Cart = { [id : number] : number };

const CartContext = createContext <{
    cart: Cart;
    addToCart: (id: number) => void;
    updateQuantity: (id: number, qty: number) => void;
    removeFromCart: (id: number) => void;
    totalPrice: () => number;
    totalDiscount: () => number;
    deliveryFee: () => number;
    finalTotal: () => number;
}>({
    cart: {},
    addToCart: () => {},
    updateQuantity: () => {},
    removeFromCart: () => {},
    totalPrice: () => 0,
    totalDiscount: () => 0,
    deliveryFee: () => 0,
    finalTotal: () => 0
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<Cart>(() => {
        if (typeof window !== 'undefined') {
            const storage = localStorage.getItem('ToyHouseCart');
            return storage ? JSON.parse(storage) : {}
        }
        return{};
    });

    useEffect(() => {
        localStorage.setItem('ToyHouseCart', JSON.stringify(cart));
    }, [cart])

    const addToCart = (id : number) => {
        setCart(prev => {
            if(prev[id]){
                return {...prev, [id]: prev[id] + 1};
            }
            return {...prev, [id]: 1};
        });
    };

    const updateQuantity = (id: number, qty: number) => {
        setCart(prev => ({...prev, [id]: Math.max(qty, 0)}));
    }

    const removeFromCart = (id: number) => {
        setCart(prev => {
            const updated = {...prev};
            delete updated[id]
            return updated
        })
    }
    const totalPrice = () =>{
        const total = Object.entries(cart).reduce((sum, [id, quantity]) => {
            const product = products.find(p => p.id === Number(id))
            if(product) sum += product.price * quantity
            const roundedSum = Math.round(sum * 100) / 100
            return roundedSum;
        } , 0);
        return total;
    }

    const totalDiscount = () => {
        const discount = Object.entries(cart).reduce((sum, [id, quantity]) => {
            const product = products.find(p => p.id === Number(id))
            if(product && product.discount){
                sum += Math.floor((product.price * product.discount / 100) * quantity)
            } 
            return sum
        }, 0)
        return discount
    }

    const deliveryFee = () => {
        const sum = totalPrice() >= 100 ? 0 : 5; 
        const roundedSum = Math.round(sum * 100) / 100;
        return roundedSum;
    }

    const finalTotal = () => {
        return totalPrice() - totalDiscount() + deliveryFee()
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, totalPrice, totalDiscount, deliveryFee, finalTotal }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => React.useContext(CartContext);