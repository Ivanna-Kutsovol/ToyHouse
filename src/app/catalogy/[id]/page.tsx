'use client'

import React, { useState, use } from "react";
import { products } from "../../../data/product";
import Image from "next/image";
import stl from "./page.module.scss";
import Link from "next/link";
import { useCart } from "@/context/cartContext";

import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import 'swiper/css';

type Props = {
    params: {
        id: string
    }
}

const Product = ({ params, images }: { params: Promise<{ id: string }>, images: string[] }) => {
    const { cart, addToCart, updateQuantity } = useCart();
    const { id } = use(params);
    const product = products.find((p) => p.id === Number(id));
    const [activeTab, setActiveTab] = useState("info");
    const [thumbsSwiper, setTrumbsSwiper] = useState<SwiperType | null>(null);

    if(!product) return <h1>Product not found</h1>;

    const quantity = cart[product.id] || 0;

    return(
        <section className={stl.container}>
            <Link className={stl.back} href="/">Back</Link>
            <section className={stl.product}>
                <div className={stl.product__imgContainer}>
                    <Swiper
                        modules={[Navigation, Autoplay, Thumbs]}
                        autoplay={{ delay: 3000 }}
                        spaceBetween={30}
                        thumbs={{ swiper: thumbsSwiper }}
                        centeredSlides={true}
                        loop={true}
                        className={stl.swiper}
                        > 
                        {product.details.img.map((img, index) => (
                            <SwiperSlide key={`main-${index}`}>
                                <Image className={stl.product__imgContainer__mainImg} src={img} alt={`product-${index}`} width={300} height={427} />
                            </SwiperSlide> 
                    ))}
                    </Swiper>

                    <Swiper
                        modules={[Thumbs, Navigation]}
                        navigation={{disabledClass: 'swiper-button-disabled'}}
                        onSwiper={setTrumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        loop={true}
                        className={stl.product__thumbsContainer}
                    >
                        {product.details.img.map((imag, index) => (
                            <SwiperSlide key={`thumb-${index}`}>
                                <Image className={stl.product__imgContainer__thumbs} src={imag} alt={`product-${index}`} width={100} height={100} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={stl.product__info}>
                    <div className={stl.product__titlePrice}>
                        <h1 className={stl.product__title}>{product.name}</h1>
                        <h2 className={stl.product__price}>$ {product.price}</h2>
                    </div>

                    <div className={stl.product__counter}>
                        {quantity >= 0 && (
                            <div className={stl.product__counter}>
                                <button className={stl.product__counter__button} onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                                <p className={stl.product__counter__text}>{quantity}</p>
                                <button className={stl.product__counter__button} onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                            </div>
                        )}
                    </div> 
                    <div className={stl.product__buttons}>
                        <Link href="/cart"><button className={stl.product__buttonBuy}  onClick={() => addToCart(product.id)}>Buy it now</button></Link>
                        <Link href="/cart"><button className={stl.product__buttonCart}  onClick={() => addToCart(product.id)}>Add To Cart</button></Link>
                    </div>
                    <div className={stl.tabs}>
                        <div className={stl.tabs__item}>
                            <p className={`${activeTab === 'info' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => setActiveTab("info")}>Product Info</p>
                            <p className={`${activeTab === 'spec' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => setActiveTab("spec")}>General Specification</p>
                            <p className={`${activeTab === 'delivery' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => setActiveTab("delivery")}>Delivery & Returns</p>
                        </div>

                        <div className={stl.tabs__text}>
                            {activeTab === 'info' && 
                            <p >{product.details.fullDescription.productInfo}</p>}
                            {activeTab === 'spec' && 
                            <p >{product.details.fullDescription.general}</p>}
                            {activeTab === 'delivery' &&
                            <p >{product.details.fullDescription.delivery}</p>}
                        </div>
                    </div>
                    
                </div>
                
            </section>
            
            
        </section>
        
    )
}

export default Product;