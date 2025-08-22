import React from "react";
import stl from "./page.module.scss";
import Link from "next/link";

const Succes = () => {
    return (
        <section className={stl.success}>
            <div className={stl.success__icon}/>
            <h1 className={stl.success__title}>Thank you! Your order has been placed.</h1>
            <div className={stl.success__bottom}>
                <p className={stl.success__text}>We will process your order shortly. You can continue shopping:</p>
                <Link href="/#catalogy" className={stl.success__button}>Back to catalog</Link>
            </div>

        </section>
    )
}

export default Succes;