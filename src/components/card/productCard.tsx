'use client'

import React, { useState } from "react";
import stl from "./productCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";

type Props = {
    product: IProduct,
    quantity: number,
    onAdd?: () => void,
    onChange: (qty : number) => void,
    onDelete?: () => void,
    showBuyButton?: boolean,
    variant?: 'catalog' | 'cart'
}

const ProductCard = ({product, quantity, onAdd, onChange, onDelete, showBuyButton, variant} : Props) => {
    const isCart = variant==='cart';

    return(
        <section className={`${stl.card} ${isCart ? stl['card--cart'] : ''}`}>
            <div className={stl.card__backgraundProduct}>
                <Image className={stl.card__img} src={product.img} alt="product" width={170} height={250} />
                {product.discount && (
                    <span className={stl.card__discountBadge}>
                    -{product.discount}%
                    </span>
                )}
            </div>

            {isCart ? (
                <div className={stl.card__info}>
                    <p className={stl.card__name}>{product.name}</p>
                    <p className={stl.card__description}>{product.description}</p>
                    {quantity > 0 && (
                <div className={stl.card__counter}>
                    <button className={stl.card__counter__button} onClick={() => onChange(quantity - 1)}>−</button>
                    <p className={stl.card__counter__text}>{quantity}</p>
                    <button className={stl.card__counter__button} onClick={() => onChange(quantity + 1)}>+</button>
                </div>
                )}
                    <div className={stl.card__footer}>
                        <div>
                            {product.discount ? (
                                <div className={stl.card__containerPrice}>
                                    <p className={stl.card__priceOld}>$ {product.price}</p>
                                    <p className={stl.card__price}>$ {(product.price * (100 - product.discount) / 100).toFixed(2)}</p>
                                </div>
                            ) : (
                                <p className={stl.card__price}>$ {product.price}</p>
                            )}
                        </div>
                        
                        { showBuyButton === false &&
                            <button className={`${stl.buttonDelete}`} onClick={onDelete}>Delete</button>
                        }
                    </div>
                </div>
            ):(
                <>
                    <Link className={stl.card__link} href={`/catalogy/${product.id}`}>
                    <div className={stl.card__info}>
                        <p className={stl.card__name}>{product.name}</p>
                        <p className={stl.card__description}>{product.description}</p>
                        <div className={stl.card__containerPrice}>
                            {product.discount ? (
                                <>
                                    <p className={stl.card__priceOld}>$ {product.price}</p>
                                    <p className={stl.card__price}>$ {(product.price * (100 - product.discount) / 100).toFixed(2)}</p>
                                </>
                            ) : (
                                <p className={stl.card__price}>$ {product.price}</p>
                            )}
                        </div>
                    </div>
                    </Link>
                    <div className={stl.card__buttons}>
                    {showBuyButton !== false && 
                        <button className={`${stl.button} ${quantity === 0 ? stl.button_full : stl.button_small}`} onClick={onAdd}>Buy</button>
                    }
                    {quantity > 0 && (
                    <div className={stl.card__counter}>
                        <button className={stl.card__counter__button} onClick={() => onChange(quantity - 1)}>−</button>
                        <p className={stl.card__counter__text}>{quantity}</p>
                        <button className={stl.card__counter__button} onClick={() => onChange(quantity + 1)}>+</button>
                    </div>
                    )}
                    </div>
                    <Link href={`/cart`} className={`${stl.button__addCartContainer} ${quantity > 0 ? stl.show : stl.hide}`}>
                            <button className={`${stl.button__addCart} ${quantity > 0 ? stl.show : stl.hide}`} onClick={onAdd}>Add to cart</button>
                    </Link>            
                </>
            ) 
            }
            
        </section>
    )
}

export default ProductCard;
