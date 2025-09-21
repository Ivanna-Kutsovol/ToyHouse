import React from "react";
import stl from "./footer.module.scss";
import Image from "next/image";
import Logo from "../../../../public/logo.webp";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className={stl.footer}>  
            <div className={stl.footer__top}>
                <Link className={stl.nav__linkImg} href="/">
                    <Image className={stl.nav__img} src={Logo} alt="logo" width={65} height={40} />
                </Link>
                <nav className={stl.nav}>
                    <ul className={stl.nav__list}>
                        <li className={stl.nav__item}>
                            <Link className={stl.nav__link} href="/#about">About us</Link>
                        </li>
                        <li className={stl.nav__item}>
                            <Link className={stl.nav__link} href="/#catalogy">Catalogy</Link>
                        </li>
                        <li className={stl.nav__item}>
                            <Link className={stl.nav__link} href="/#feedback">Feedback</Link>
                        </li>
                        <li className={stl.nav__item}>
                            <Link className={stl.nav__link} href="/#contacts">Contacts</Link>
                        </li>
                    </ul>
                </nav>
            </div>  
            
            <div className={stl.footer__bottom}>
                <p className={stl.footer__bottom__text}>© All Rights Reserved</p>
            </div>
        </footer>
    );
};