'use client';

import React, { useState, useEffect, useRef, useMemo } from "react";
import stl from "./page.module.scss"
import { useCart } from "@/context/cartContext";
import { products } from "@/data/product";
import Link from "next/link";
import { useStorage } from "@/components/utils/storage";
import dynamic from 'next/dynamic';

import {useForm, SubmitHandler} from "react-hook-form";
import { useRouter } from "next/navigation";
import { IForm } from "@/types/form";

const ProductCard = dynamic(() => import("@/components/card/productCard"), {ssr: false});

const CartInner = () => {

    const{cart, removeFromCart, updateQuantity, totalPrice, totalDiscount, deliveryFee, finalTotal} = useCart();
    const discount = useMemo(() => totalDiscount(), [cart]);
    const cartEmply = Object.values(cart).every(qty => qty === 0);
    const [alertShow, setAlertShow] = useState(false);
    const [renderAlert, setRenderAlert] = useState(false);
    const { dataState, handleChange } = useStorage();
    const router = useRouter();
    const [widthWindow, setWidthWindow] = useState(0);

    const parentRef = useRef<HTMLFormElement>(null);
    const productRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
            if (typeof window === "undefined") return;
    
            const handeResize = () => setWidthWindow(window.innerWidth);
    
            handeResize();
            window.addEventListener("resize", handeResize);
    
            return () => window.removeEventListener("resize", handeResize);
        }, [])

    useEffect(() => {
        const parent = parentRef.current;
        const product = productRef.current;

        if(!parent || !product) return;

        const handleScroll = () => {
            const parent = parentRef.current;
            const product = productRef.current;
            if (!parent || !product) return;

            if (window.innerWidth < 1024) {
                product.style.position = 'static';
                product.style.top = 'auto';
                product.style.right = 'auto';
                return; 
            }

            const parentRect = parent.getBoundingClientRect();
            const productHeight = product.offsetHeight;
            const parentHeight = parent.offsetHeight;
            const scrollTop = window.scrollY;
            const offsetTop = 80; 

            let offsetRight = window.innerWidth >= 1440 ? 165 : 50;

            if (scrollTop + offsetTop > parentRect.top + scrollTop &&
                scrollTop + offsetTop + productHeight < parentHeight + parentRect.top + scrollTop
            ) {
                product.style.position = 'fixed';
                product.style.top = `${offsetTop}px`;
                product.style.left = 'auto';
                product.style.right = `${window.innerWidth - parentRect.right}px`;
            } else if (scrollTop + offsetTop + productHeight >= parentHeight + parentRect.top + scrollTop) {
                product.style.position = 'absolute';
                product.style.top = `${parentHeight - productHeight}px`;
                product.style.right = '0';
            } else {
                product.style.position = 'static';
                product.style.top = 'auto';
                product.style.right = 'auto';
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); 

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    },[])

    const [defaultFormValues, setDefaultFormValues] = useState<IForm | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      const storedData = localStorage.getItem("toyHouseData");
      if (storedData) {
        setDefaultFormValues(JSON.parse(storedData).orderData);
      } else {
        setDefaultFormValues({
          city: '',
          address: '',
          name: '',
          phone: '',
          email: '',
          loyaltyCard: '',
          delivery: 'door',
          comments: '',
          agreeToTerms: false,
        });
      }
    }, []);

    const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm<IForm>({
        mode: "onChange",
        defaultValues: defaultFormValues || {},
    });

    useEffect(() => {
        const subscription = watch((value) => {
        localStorage.setItem("toyHouseData", JSON.stringify({ orderData: value }));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedData = localStorage.getItem("toyHouseData");
        if (storedData) {
            setDefaultFormValues(JSON.parse(storedData).orderData);
        }
        }, []);

    useEffect(() => {
        if(alertShow){
            setRenderAlert(true);
        }
    }, [alertShow])

    const handleClose = () => {
        setAlertShow(false);
        setTimeout(() => setRenderAlert(false), 500);
    }

    const onSubmit: SubmitHandler<IForm> = (data) => {
        if(cartEmply){
            setAlertShow(true);
        }else{
            Object.keys(cart).forEach(id => removeFromCart(Number(id)));

            reset();
            localStorage.removeItem("toyHouseData");
            router.push("/checkout/success");
        }
    }

    if (!isClient) return null;

    return (
        <section className={stl.cart}>
            {widthWindow < 1024 ? (
                <div className={stl.cart__backAndSummary}>
                    <Link className={stl.back} href="/">Back</Link>
                    <div className={stl.cart__line}>
                        <p className={stl.cart__label}>Summary:</p> 
                        <p className={stl.cart__value}>${totalPrice()}</p>
                    </div>
                </div>
            ) :(
                <Link className={stl.back} href="/">Back</Link>
            )} 
            <section className={stl.cart__main} ref={parentRef}>
                <form className={stl.cart__form} onSubmit={handleSubmit(onSubmit)}>
                    <section className={stl.cart__sectionForm}>
                        <div className={stl.cart__input}>
                            <label htmlFor="city" className={stl.cart__form__label}>City</label>
                            <input type="text" placeholder="Enter city" id="city" className={stl.cart__form__input}
                            {...register("city",{
                                required: true ,
                                pattern: {
                                    value: /^[A-Za-zÀ-ž\s-]{1,40}$/,
                                    message: 'Invalid city format'
                                }
                            })}/>
                            {errors.city && <small className={stl.form__error}>{errors.city.message}</small>}
                        </div>
                        <div className={stl.cart__input}>
                            <p className={stl.cart__form__label}>Delivery method</p>
                            <div className={stl.cart__delivery}>
                                <div className={stl.cart__button}>
                                    <input type="radio" id="pickup" value="pickup" {...register("delivery",{required: true})} />
                                    <label className={`${stl.cart__form__labelButton} ${stl.cart__form__labelButtonDoor}`} htmlFor="pickup">In-store pick up</label>
                                </div>
                                <div className={stl.cart__button}>
                                    <input type="radio" id="door" value="door" {...register("delivery",{required: true})} />
                                    <label className={`${stl.cart__form__labelButton} ${stl.cart__form__labelButtonDoor}`} htmlFor="door">To the door</label>
                                </div>
                            </div>
                            
                        </div>
                        <div className={stl.cart__input}>
                            <label className={stl.cart__form__label} htmlFor="address">Address</label>
                            <input autoComplete="address-line1" type="text" placeholder="Enter address" id="address" className={stl.cart__form__input}
                            {...register("address",{
                                required: true ,
                                pattern: {
                                    value: /^[A-Za-z0-9\s.,-]{3,100}$/,
                                    message: 'Invalid address format'
                                }
                            })}/>
                            {errors.address && <small className={stl.form__error}>{errors.address.message}</small>}
                        </div>
                    </section>
                    
                    <section className={stl.cart__sectionForm}>
                        <p className={stl.cart__topic}>Point</p>
                        <div className={stl.cart__input}>
                            <label className={stl.cart__form__label} htmlFor="loyaltyCard">Enter your loyalty card</label>
                            <input type="text" placeholder="Enter your loyalty card" id="loyaltyCard" className={stl.cart__form__input}
                            {...register("loyaltyCard", {required: false})}/>
                        </div>
                    </section>
                    <section className={stl.cart__sectionForm}>
                        <p className={stl.cart__topic}>Recipient's details</p>
                        <div className={stl.cart__input}>
                            <label className={stl.cart__form__label} htmlFor="nameSurname">Name and surname</label>
                            <input autoComplete="name" type="text" placeholder="Enter name and surname" id="nameSurname" className={stl.cart__form__input}
                            {...register("name", 
                            {required: true,
                                pattern: {
                                    value: /^[A-Za-zÀ-ž\s'-]{1,60}$/,
                                    message: 'Invalid name and surname format'
                                }
                            })}/>
                            {errors.name && <small className={stl.form__error}>{errors.name.message}</small>}
                        </div>
                        <div className={stl.cart__input}>
                            <label className={stl.cart__form__label} htmlFor="phone">Phone</label>
                            <input autoComplete="tel" type="tel" placeholder="Enter phone number" id="phone" className={stl.cart__form__input}
                            {...register("phone",
                                {required: true,
                                    pattern: {
                                        value: /^\+?[0-9\s()-]{7,20}$/,
                                        message: 'Please enter a valid phone number'
                                    }
                                }
                            )}/>
                            {errors.phone && <small className={stl.form__error}>{errors.phone.message}</small>}
                        </div>
                        <div className={stl.cart__input}>
                            <label className={stl.cart__form__label} htmlFor="email">Email</label>
                            <input autoComplete="email" type="email" placeholder="Enter email" id="email" className={stl.cart__form__input}
                            {...register("email",
                                {required: true,
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'Please enter a valid email'
                                    }
                                }
                            )}/>
                            {errors.email && <small className={stl.form__error}>{errors.email.message}</small>}
                        </div>
                        <div className={stl.cart__input}>
                            <label className={stl.cart__form__label}>Payment method</label>
                            <button type="button" className={stl.cart__form__paymentButton}>Payment card</button>
                        </div>
                        <div className={stl.cart__input}>
                            <label className={stl.cart__form__label} htmlFor="comments">Order Comment</label>
                            <textarea id="comments" className={`${stl.cart__form__input} ${stl.cart__form__inputComments}` }
                            {...register("comments", {required: false, maxLength: 200})}/>
                        </div>
                        {widthWindow < 1024 && 
                        <div className={stl.cart__totalContainer}>
                        <div className={stl.cart__summary}>
                            <div className={stl.cart__line}>
                                <p className={stl.cart__label}>Summary:</p> 
                                <p className={stl.cart__value}>${totalPrice()}</p>
                            </div>
                            <div className={stl.cart__line}>
                                <p className={stl.cart__label}>Delivery:</p> 
                                <p className={stl.cart__value}>${deliveryFee()}</p>
                            </div>
                                {discount > 0 && 
                                    <div className={stl.cart__line}> 
                                        <p className={stl.cart__label}>Promocode: </p> 
                                        <p className={stl.cart__value}> ${totalDiscount()}</p>
                                    </div>
                                }
                        </div>
                        <div className={stl.cart__line}>
                            <span className={stl.cart__labelTotal}>Total:</span>
                            <p className={stl.cart__valueTotal}>$ {finalTotal()} </p>
                        </div>
                    </div>
                    }
                        <div className={stl.cart__inputCheckbox}>
                            <input type="checkbox" className={stl.cart__form__inputCheckbox} id="agreeToTerms" {...register('agreeToTerms', {required: true})}/>
                            <label className={stl.cart__form__label} htmlFor="agreeToTerms">I agree to the <span className={stl.cart__form__link}>terms of the offer </span>and the <span className={stl.cart__form__link}>loyalty policy</span></label>
                        </div>
                    </section>
                    <button type="submit" className={`${isValid ? stl.cart__form__buttonActive : stl.cart__form__button}`}>Place an order</button>
                </form>

                {alertShow && 
                    <section className={`${stl.alert} ${alertShow ? stl.active : stl.hidden}`}>
                        <p className={stl.alert__text}> There are no products in the cart </p>
                        <div className={stl.alert__line}/>
                        <div className={stl.alert__buttons}>
                            <button type="button" onClick={handleClose} className={stl.alert__button}>Cancel</button>
                            <Link type="button" href="/#catalogy" onClick={handleClose} className={stl.alert__button}>Swith to product</Link>
                        </div>
                    </section>
                }
                <aside className={stl.cart__products} ref={productRef}>
                    {products.filter((product) => cart[product.id] > 0).map((product)=>(
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        quantity={cart[product.id] || 0}
                        onDelete={() => removeFromCart(product.id)}
                        onChange={(quantity) => updateQuantity(product.id, quantity)}
                        showBuyButton={false}
                        variant='cart'
                    />
                    ))}
                    {widthWindow >= 1024 && 
                        <div className={stl.cart__totalContainer}>
                        <div className={stl.cart__summary}>
                            <div className={stl.cart__line}>
                                <p className={stl.cart__label}>Summary:</p> 
                                <p className={stl.cart__value}>${totalPrice()}</p>
                            </div>
                            <div className={stl.cart__line}>
                                <p className={stl.cart__label}>Delivery:</p> 
                                <p className={stl.cart__value}>${deliveryFee()}</p>
                            </div>
                                {discount > 0 && 
                                    <div className={stl.cart__line}> 
                                        <p className={stl.cart__label}>Promocode: </p> 
                                        <p className={stl.cart__value}> ${totalDiscount()}</p>
                                    </div>
                                }
                        </div>
                        <div className={stl.cart__line}>
                            <span className={stl.cart__labelTotal}>Total:</span>
                            <p className={stl.cart__valueTotal}>$ {finalTotal()} </p>
                        </div>
                    </div>
                    }
                </aside>
            </section>
        </section>
    )
}

export default CartInner;