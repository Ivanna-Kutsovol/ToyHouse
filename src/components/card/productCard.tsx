'use client'

import React from "react";
import stl from "./productCard.module.scss";
import Image from "next/image";
import Link from "next/link";

type Product = {
    id: number,
    name: string,
    price: number,
    img: string,
    description: string,
}

type Props = {
    product: Product,
    quantity: number,
    onAdd: () => void,
    onChange: (qty : number) => void
}

const ProductCard = ({product, quantity, onAdd, onChange} : Props) => {
    return(
        <section className={stl.card}>
            <Link className={stl.card__link} href={`/catalogy/${product.id}`}>
            <div className={stl.card__backgraundProduct}>
                <Image className={stl.card__img} src={product.img} alt="product" width={170} height={250} />
            </div>
            
            <div className={stl.card__info}>
                <p className={stl.card__name}>{product.name}</p>
                <p className={stl.card__description}>{product.description}</p>
                <p className={stl.card__price}>$ {product.price}</p>
            </div>
            </Link>
            <div className={stl.card__buttons}>
                <button className={`${stl.button} ${quantity === 0 ? stl.button_full : stl.button_small}`} onClick={onAdd}>Buy</button>
                {quantity > 0 && (
                <div className={stl.card__counter}>
                    <button className={stl.card__counter__button} onClick={() => onChange(quantity - 1)}>−</button>
                    <p className={stl.card__counter__text}>{quantity}</p>
                    <button className={stl.card__counter__button} onClick={() => onChange(quantity + 1)}>+</button>
                </div>
                )}
            </div>
        </section>
    )
}

export default ProductCard;
