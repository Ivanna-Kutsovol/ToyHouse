import React from "react";
import stl from "./mobileMenu.module.scss";
import Link from "next/link";
import Image from "next/image";
import ShoppingCart from "../../../../public/shopping-cart.webp";

interface MobileMenuProps {
    tooggleMenu: () => void;
}

const MobileMenu:React.FC<MobileMenuProps> = ({  tooggleMenu }) => {
    return (
        <div className={stl.mobileHeader}>
            <nav className={stl.nav} onClick={tooggleMenu}>
                <ul className={stl.nav__list}>
                    <li className={stl.nav__item}>
                        <Link className={stl.nav__link} href="/about">About us</Link>
                    </li>
                    <li className={stl.nav__item}>
                        <Link className={stl.nav__link} href="/catalogy">Catalogy</Link>
                    </li>
                    <li className={stl.nav__item}>
                        <Link className={stl.nav__link} href="/feedback">Feedback</Link>
                    </li>
                    <li className={stl.nav__item}>
                        <Link className={stl.nav__link} href="/contacts">Contacts</Link>
                    </li>
                    <li className={stl.nav__item}>
                        <Link className={stl.nav__linkImg} href="/cart">
                            <Image className={stl.nav__img} src={ShoppingCart} alt="shopping cart" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default MobileMenu;