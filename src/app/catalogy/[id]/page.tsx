'use client'

import React, { useState, use, useRef, useEffect } from "react";
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
    params: Promise<{ id: string }>
}

const Product: React.FC<Props> = ({ params }) => {
    const { cart, addToCart, updateQuantity } = useCart();
    const { id } = use(params);
    const product = products.find((p) => p.id === Number(id));
    const [activeTab, setActiveTab] = useState("info");
    const [thumbsSwiper, setTrumbsSwiper] = useState<SwiperType | null>(null);
    const [widthWindow, setWidthWindow] = useState(0);

    const parentRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const parent = parentRef.current;
        const button = buttonRef.current; 

        if(!parent || !button) return;

        const handlyScroll = () => {

            const rect = parent.getBoundingClientRect();

            if(rect.bottom > window.innerHeight){
                button.style.display = "block";
                button.style.position = "fixed";
                button.style.bottom = "0";
            } else {
                button.style.display = "none";
            }
        }

        window.addEventListener("scroll", handlyScroll);
        handlyScroll();
        return () => window.removeEventListener("scroll", handlyScroll);

    },[])

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handeResize = () => setWidthWindow(window.innerWidth);

        handeResize();
        window.addEventListener("resize", handeResize);

        return () => window.removeEventListener("resize", handeResize);
    }, [])

    const tabsContainerRef = useRef<HTMLDivElement>(null)

    const handlyClick = (tab: string, index: number) => {
        setActiveTab(tab);

        if(tabsContainerRef.current){
            const tabNode = tabsContainerRef.current.children[index] as HTMLElement;
            const container = tabsContainerRef.current;

            const containerRect = container.getBoundingClientRect();
            const tabRect = tabNode.getBoundingClientRect();

            container.scrollLeft += tabRect.left - containerRect.left - (containerRect.width / 2 - tabRect.width / 2);
        }
    }

    if(!product) return <h1>Product not found</h1>;

    const quantity = cart[product.id] || 0;

    return(
        <section className={stl.container} ref={parentRef}>
            <Link className={stl.back} href="/">Back</Link>
            {widthWindow < 425 && (
                <h1 className={stl.product__title}>{product.name}</h1>
            )}
            <section className={stl.product}>
                <div className={stl.product__imgContainer}>
                    <Swiper
                        modules={[Navigation, Autoplay, Thumbs]}
                        autoplay={{ delay: 3000 }}
                        spaceBetween={30}
                        thumbs={{ swiper: widthWindow >= 425 ? thumbsSwiper : null }}
                        centeredSlides={true}
                        loop={true}
                        className={stl.swiper}
                        navigation={widthWindow < 425 ? true : false}
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
                {widthWindow <= 425 ? (
                    <div className={stl.product__infoContainer}>
                        <div className={stl.product__info}>
                            <div className={stl.product__titlePrice}>
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
                    </div>

                    <div className={stl.product__buttons}>
                        <Link href="/cart" className={stl.product__buttonCart}><button style={{fontWeight:'bolder', fontSize: '16px'}} onClick={() => addToCart(product.id)}>Add To Cart</button></Link>
                    </div>
                    <div className={stl.tabs}>
                        <div className={stl.tabs__item} ref={tabsContainerRef}>
                            <p className={`${activeTab === 'info' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => handlyClick("info", 0)}>Product Info</p>
                            <p className={`${activeTab === 'spec' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => handlyClick("spec", 1)}>General Specification</p>
                            <p className={`${activeTab === 'delivery' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => handlyClick("delivery", 2)}>Delivery & Returns</p>
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
                ) : (
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
                        <div className={stl.tabs__item} ref={tabsContainerRef}>
                            <p className={`${activeTab === 'info' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => handlyClick("info", 0)}>Product Info</p>
                            <p className={`${activeTab === 'spec' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => handlyClick("spec", 1)}>General Specification</p>
                            <p className={`${activeTab === 'delivery' ? stl.tabs__active : stl.tabs__inactive}`} onClick={() => handlyClick("delivery", 2)}>Delivery & Returns</p>
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
                )}
            </section>
            {widthWindow < 425 && 
            <div ref={buttonRef} className={stl.product__fixedBtnContainer}>
                <Link href="/cart" className={stl.product__fixedBtn}>
                    <button className={stl.product__buttonBuy} onClick={() => addToCart(product.id)}>
                        <h2 className={stl.product__price}>$ {product.price}</h2> Buy it now</button>
                </Link>    
            </div>
            }
        </section>
        
    )
}

export default Product;