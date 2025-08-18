'use client'

import React from "react";
import Link from "next/link";
import stl from "./contacts.module.scss";
import Image from "next/image";
import Left from "../../../public/contacts/left.webp";
import Right from "../../../public/contacts/right.webp";
import Email from "../../../public/contacts/iconEmail.webp";
import Phone from "../../../public/contacts/iconPhone.webp";
import Address from "../../../public/contacts/iconAddress.webp";
import Facebook from "../../../public/contacts/socialFacebook.webp";
import Instagram from "../../../public/contacts/socialInstagram.webp";
import Twitter from "../../../public/contacts/socialTwitter.webp";
import Youtube from "../../../public/contacts/socialYoutube.webp";
import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("./map"), { ssr: false });
const Contacts = () => {
    return(
        <section className={stl.contacts} id="contacts">
            <Image className={stl.contacts__left} priority src={Left} alt="left" />
            <section className={stl.title}>
                <h1 className={stl.title__text}>Contacts</h1>
            </section>
            <section className={stl.contacts__infoMap}>
            <section className={stl.contacts__info}>
            <div className={stl.contacts__infoTop}>
                <address  className={stl.contacts__item}>
                    <Image className={stl.contacts__img} src={Email} alt="icon email"/>
                    <h2 className={stl.contacts__title}>Email</h2>
                    <a className={stl.contacts__text} href="mailto:ivannakucovol@gmail.com">ivannakucovol@gmail.com</a>
                </address >
                <address  className={stl.contacts__item}>
                    <Image className={stl.contacts__img} src={Phone} alt="icon phone"/>
                    <h2 className={stl.contacts__title}>Call Us</h2>
                    <a className={stl.contacts__text} href="tel:0800123456">0 800 123 456</a>
                </address >
            </div>
            <div className={stl.contacts__infoBottom}>
                <address  className={stl.contacts__item}>
                    <Image className={stl.contacts__img} src={Address} alt="icon address"/>
                    <h2 className={stl.contacts__title}>Address</h2>
                    <p className={stl.contacts__text}>Maidan Nezalezhnosti, Kyiv, Ukraine</p>
                </address >
                <div className={stl.contacts__item}>
                    <h2 className={stl.contacts__title}>Follow Us</h2>
                    <div className={stl.contacts__social}>
                        <Link href="https://www.facebook.com/">
                            <Image className={stl.contacts_social} src={Facebook} alt="social facebook"/>
                        </Link>
                        <Link href="https://www.instagram.com/">
                            <Image className={stl.contacts_social} src={Instagram} alt="social instagram"/>
                        </Link>
                        <Link href="https://twitter.com/">
                            <Image className={stl.contacts_social} src={Twitter} alt="social twitter"/>
                        </Link>
                        <Link href="https://www.youtube.com/">
                            <Image className={stl.contacts_social} src={Youtube} alt="social youtube"/>
                        </Link>
                    </div>
                </div>
            </div>
                
            </section>
                <MyMap/>
            </section>
            <Image className={stl.contacts__right} src={Right} alt="right" />
        </section>
    )
};

export default Contacts;