'use client'

import React, { useRef, useState } from "react";
import stl from "./about.module.scss";
import Image from "next/image";
import Plus from "../../../public/plus.png";
import Minus from "../../../public/remove.png";
import Facebook from "../../../public/social/facebook.png";
import Instagram from "../../../public/social/inst.png";
import Twitter from "../../../public/social/twitter.png";
import YouTube from "../../../public/social/youtube.png";

const Accordion = [
    {
        question: "What age group are your toys suitable for?",
        answer: "Content 1",
    },
    {
        question: "How do your toys promote skill development?",
        answer: "Content 2",
    },
    {
        question: "Are your toys safe and environmentally friendly?",
        answer: "Absolutely! We offer only safe and sustainable toys made from high-quality, non-toxic materials that meet strict safety standards. We believe in providing safe play experiences while also being mindful of our planet.",
    }
]

const AboutUs = () => {
    const [openStates, setOpenStates] = useState<boolean[]>(
        new Array(Accordion.length).fill(false)
    );

    const contentRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = (index: number) => {
        const newStates = [...openStates];
        newStates[index] = !newStates[index];
        setOpenStates(newStates);
    };

    return (
        <div className={stl.container}>
            <section className={stl.title}>
                <h1 className={stl.title__text}>About Us</h1>
            </section>
            <p className={stl.container__text}>
                Welcome to a world of creativity and fun! We provide unique toys, like water drawing mats and magnetic constructors, that help develop fine motor skills and imagination. Each toy is designed with children's needs in mind for engaging and memorable learning.</p>
            <p className={stl.container__text}>
                Our products entertain while helping young explorers build essential skills. Join us and let every child become an artist and creator. Playing with our toys is an opportunity to grow and dream!
            </p>
            <section className={stl.containerAccordion}>
                {Accordion.map((item, index) => (
                    <div key={index} className={stl.accordion}>
                        <div className={stl.accordion__header} onClick={() => toggleAccordion(index)}>
                            <h6 className={openStates[index] ? stl.accordion__titleActive : stl.accordion__title}>{item.question}</h6>
                            <Image src={openStates[index] ? Minus : Plus} alt="icon"  className={stl.accordion__icon}/>
                        </div>
                        <div 
                            ref={contentRef}
                            className={stl.accordion__content}
                            style={{
                                maxHeight: openStates[index]
                                ? `${contentRef.current?.scrollHeight}px`
                                : "0px",
                                paddingTop: openStates[index] ? "24px" : "0px",
                            }}>
                         <p className={ openStates[index] ? stl.accordion__contentActive : stl.accordion__content}>{item.answer}</p>
                         </div>
                    </div>
                ))}
            </section>
            <div className={stl.social}>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <Image src={Facebook} width={32} height={32} alt="icon" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <Image src={Instagram} width={32} height={32} alt="icon" />
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <Image src={YouTube} width={32} height={32} alt="icon" />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <Image src={Twitter} width={32} height={32} alt="icon" />
                </a>
            </div>
        </div>
    );
};

export default AboutUs;