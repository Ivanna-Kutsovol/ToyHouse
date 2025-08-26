import React from "react";
import stl from "./specialConditions.module.scss";

const SpecialConditions = () => {
    return (
    <section className={stl.specialConditions}>
        <section className={stl.title}>
            <h1 className={stl.title__text}>Special conditions for partners </h1>
        </section>
        <section className={stl.specialConditions__list}>
        <div className={stl.specialConditions__item}>
            <div className={stl.specialConditions__star}>01</div>
            <p className={stl.specialConditions__text}>You call or leave a request on the website</p>
        </div>
        <div className={stl.specialConditions__item}>
            <div className={stl.specialConditions__star}>02</div>
            <p className={stl.specialConditions__text}>Our manager will contact you and talk about the terms of cooperation</p>
        </div>
        <div className={stl.specialConditions__item}>
            <div className={stl.specialConditions__star}>03</div>
            <p className={stl.specialConditions__text}>We discuss all the conditions and you become our new partner</p>
        </div>
        <div className={stl.specialConditions__item}>
            <div className={stl.specialConditions__star}>04</div>
            <p className={stl.specialConditions__text}>We provide you with a catalog of our product positions</p>
        </div>
        </section>
    </section>
    )
}

export default SpecialConditions;