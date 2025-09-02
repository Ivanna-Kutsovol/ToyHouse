"use client"

import React, { useRef } from "react";
import Link from "next/link";
import stl from "./hero.module.scss";
import Image from "next/image";
import left from "../../../public/hero/left.png";
import right from "../../../public/hero/right.png";
import { products } from "../../data/product";
import { useRouter } from "next/navigation";

import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';

const Hero = () => {
    const router = useRouter();
    const swiperRef = useRef<any>(null); 

    const handleBuyClick = () => {
    const swiper = swiperRef.current;
    if (swiper && typeof swiper.realIndex === "number") {
        const product = products[swiper.realIndex];
        if (product) {
            router.push(`/catalogy/${product.id}`);
            console.log(product.id);
        }
    }
};
    return (
        <section className={stl.hero}>
            <Image className={stl.hero__left} src={left} alt="left" width={198} height={780} priority/>
            <section className={stl.hero__content}>
                <div className={stl.hero__container}>
                    <h1 className={stl.hero__title}>Create while playing!</h1>
                    <h2 className={stl.hero__subtitle}>Discover a world of toys that develop your child's fine motor skills and creativity.</h2>
                </div>
                <button className={stl.hero__button} onClick={handleBuyClick}>Buy Now</button>
            </section>
            <section className={stl.sliderHero}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 3000 }}
                    speed={1500}
                    centeredSlides={true} 
                    loop={true}
                    navigation
                    className={stl.swiper}
                    breakpoints={{
                      320: { slidesPerView: 3, spaceBetween: 30 },
                      768: { slidesPerView: 3, spaceBetween: 110 },
                      1024: { slidesPerView: 3, spaceBetween: 50 },
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {[...products, ...products].map((product, index) => (
                        <SwiperSlide key={`${product.id}-${index}`}>
                        <Link href={`/catalogy/${product.id}`}>
                            <Image className={stl.sliderHero__img} src={product.img} alt={product.name} width={130} height={195} priority/>
                        </Link>
                        </SwiperSlide> 
                    ))}            
                </Swiper>
            </section>
            <Image className={stl.hero__right} src={right} alt="right" width={165} height={550} />
        </section>
    );
};

export default Hero;