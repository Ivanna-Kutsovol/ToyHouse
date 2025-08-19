'use client'

import React, { useState, useEffect, useRef } from "react";
import stl from "./feedback.module.scss";
import Image from "next/image";
import Background from "../../../public/backgroundFeedback.svg";
import Fbdk1 from "../../../public/feedback/ImgFbdk1.webp";
import Fbdk2 from "../../../public/feedback/ImgFbdk2.webp";
import Fbdk3 from "../../../public/feedback/ImgFbdk3.webp";
import Fbdk4 from "../../../public/feedback/ImgFbdk4.webp";

const feedback = [
    {
        photo: Fbdk1,
        name: 'Liam Bennett',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        photo: Fbdk2,
        name: 'Olivia Hayes',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        photo: Fbdk3,
        name: 'Noah Sullivan',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        photo: Fbdk4,
        name: 'Jane Cooper',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
]

const CARD_WIDTH = 340;
const GAP = 30;
const STEP = CARD_WIDTH + GAP;

const Feedback = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const totalWidth = feedback.length * STEP;
        wrapper.scrollLeft = totalWidth;

        const handleScroll = () => {
            if (wrapper.scrollLeft <= STEP) {
                wrapper.scrollLeft += totalWidth;
            } else if (wrapper.scrollLeft >= totalWidth * 2 - STEP) {
                wrapper.scrollLeft -= totalWidth;
            }

            const centerOffset = wrapper.scrollLeft % totalWidth;
            const index = Math.floor(centerOffset / STEP);
            setCurrentIndex(index);
        };

        wrapper.addEventListener("scroll", handleScroll);

        return () => wrapper.removeEventListener("scroll", handleScroll);
    }, [STEP]);
    
      const scrollRight = () => wrapperRef.current?.scrollBy({ left: STEP, behavior: 'smooth' });
      const scrollLeft = () => wrapperRef.current?.scrollBy({ left: -STEP, behavior: 'smooth' });

    return (
        <section className={stl.feedbackWrapper} id="feedback">
        <Image className={stl.feedback__background} src={Background} alt="background" />
        <section className={stl.feedback}>
            <section className={stl.title}>
                <h1 className={stl.title__text}>Feedback</h1>
            </section>
            <div className={stl.feedback__outerWrapper} ref={wrapperRef}>
            <div className={stl.feedback__swiperWrapper} >
           {[...feedback, ...feedback, ...feedback].map((item, index) => (
            <div className={stl.feedback__item} key={index} >
                <div className={stl.feedback__profile}>
                    <Image className={stl.feedback__photo} src={item.photo} alt="photo" height={56} width={56}/>
                    <div className={stl.feedback__info}>
                        <h3 className={stl.feedback__name}>{item.name}</h3>
                        <div className={stl.feedback__stars}>
                            <div className={stl.feedback__star}/>
                            <div className={stl.feedback__star}/>
                            <div className={stl.feedback__star}/>
                            <div className={stl.feedback__star}/>
                            <div className={stl.feedback__starEmpty}/>
                        </div>
                    </div>
                </div>
                <p className={stl.feedback__text}>{item.text}</p>
            </div>
            ))}
            </div>
        </div>
        </section>
        <div className={stl.feedbackWrapper__pagination}>
            {[...Array(feedback.length)].map((_, index) => (
            <div
            key={index}
            className={`${stl.feedbackWrapper__paginationItem} ${index === currentIndex ? stl.active : ''}`}
            />
            ))}
        </div>


        <div onClick={scrollRight} className={stl.feedbackWrapper__next}/>
        <div onClick={scrollLeft} className={stl.feedbackWrapper__prev}/>
        </section>

    );
}

export default Feedback;