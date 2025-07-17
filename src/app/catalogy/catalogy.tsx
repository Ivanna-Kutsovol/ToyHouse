'use client';
import React from "react";
import stl from "./catalogy.module.scss";
import Background from "../../../public/backgroundCatalogy.svg";
import Image from "next/image";
import ProductCard from "../../components/card/productCard";
import { products } from "../../data/product";
import { useCart } from "../../context/cartContext";

const Catalogy = () => {
    const { cart, addToCart, updateQuantity } = useCart();
    return (
        <section className={stl.catalogy}>
            <Image className={stl.catalogy__background} src={Background} alt="background" />
            <section className={stl.title}>
                <h1 className={stl.title__text}>Catalogy</h1>
            </section>
            <section className={stl.catalogy__products}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart[product.id] || 0}
                    onAdd={() => addToCart(product.id)}
                    onChange={(quantity) => updateQuantity(product.id, quantity)}
                />
            ))}
            </section>
        </section>
    )
};

export default Catalogy;