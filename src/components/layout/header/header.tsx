"use client"

import stl from "./header.module.scss";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/logo.webp";
import ShoppingCart from "../../../../public/shopping-cart.webp";
import Open from "../../../../public/mobileHeader/open.webp";
import Close from "../../../../public/mobileHeader/close.webp";
import MobileMenu from "../mobileMenu/mobileMenu";

export const Header = () => {
    const [isViewMobile, setIsViewMobile] = useState(false);
    const [isBurgerMenu, setIsBurgerMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsViewMobile(window.innerWidth < 500);
        }
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const tooggleMenu = () => {
        setIsBurgerMenu((prev) =>!prev);
    }

    return (
        <header className={stl.header}>
            {!isViewMobile && (
            <main className={stl.main}>
                <Link className={stl.nav__linkImg} href="/">
                    <Image className={stl.nav__img} src={Logo} alt="logo" />
                </Link>
            <nav className={stl.nav} onClick={tooggleMenu}>
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
                    <li className={stl.nav__item}>
                        <Link className={stl.nav__linkImg} href="/cart">
                            <Image className={stl.nav__img} src={ShoppingCart} alt="shopping cart" />
                        </Link>
                    </li>
                </ul>
            </nav>
            </main>
            )}
            {isViewMobile && (
                <>
                <div className={stl.mobileHeader}>
                    <Link className={stl.nav__linkImg} href="/">
                        <Image className={stl.nav__img} src={Logo} alt="logo" />
                    </Link>
                    <div className={stl.burger} onClick={tooggleMenu}>
                        {!isBurgerMenu ? (
                        <button>
                            <Image src={Open} className={stl.burgerMenu} alt="Burger Menu" width={30} height={30} />
                        </button>
                    ) : (
                        <button>
                            <Image src={Close} className={stl.cross} alt="Close Menu" width={30} height={30} />
                        </button>
                    )}
                    </div>
                    </div> 
                    {isBurgerMenu && 
                        <MobileMenu tooggleMenu={() => setTimeout(() => setIsBurgerMenu(false), 800)} />}
                </>
            )}
            
        </header>
    )
}