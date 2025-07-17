"use client"

import React from "react";
import stl from "./orderCall.module.scss";
import Image from "next/image";
import {useForm} from "react-hook-form";
import Img from "../../../public/ImageOrderACall.webp";

export interface IForm {
    name: string;
    phone: string;
}

function OrdelCall() {
    const { register, handleSubmit, formState } = useForm<IForm>(
        { 
            mode: 'onBlur',
            defaultValues: {
                name: '',
                phone: ''
            }
        }
    );
    const onSubmit =(data: IForm) => console.log("submit", data);


    return (
        <section className={stl.orderCall}>
            <Image className={stl.orderCall__left} src={Img} alt="left" />
            <section className={stl.title}>
                <h1 className={stl.title__text}>Order A Call</h1>
            </section>
            <form className={stl.form} onSubmit={handleSubmit(onSubmit)}> 
                <div className={stl.form__item}>
                    <label className={stl.form__label} htmlFor="name">Name</label>
                    <input className={stl.form__input} autoComplete="off" id="name" type="text" placeholder="Name"
                    {...register("name",{
                        required: false ,
                        pattern: {
                            value: /^[A-Za-z]{1,19}$/,
                            message: 'Invalid name format'
                        }
                    })}/>
                     {formState.errors.name && <p className={stl.form__errors}>{formState.errors.name.message}</p>}
                </div>
                <div className={stl.form__item}>
                    <label className={stl.form__label} htmlFor="phone">Phone*</label>
                    <input className={stl.form__input} autoComplete="off" id="phone" type="text" placeholder="+ 1 408 000 0000"
                    {...register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                            value: /^\+1\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,
                            message: "Please enter a valid US phone number"
                        }
                    })}/>
                     {formState.errors.phone && <p className={stl.form__errors}>{formState.errors.phone.message}</p>}
                </div>
                <button className={stl.form__btn} type="submit">Send</button>
            </form>
            <Image className={stl.orderCall__right} src={Img} alt="right" />
        </section>
    );
}
export default OrdelCall;