// 'use client'

// import React from "react";
// import stl from "./feedback.module.scss";
// import Image from "next/image";
// import Background from "../../../public/backgroundFeedback.svg";
// import Fbdk1 from "../../../public/feedback/ImgFbdk1.webp";
// import Fbdk2 from "../../../public/feedback/ImgFbdk2.webp";
// import Fbdk3 from "../../../public/feedback/ImgFbdk3.webp";
// import Fbdk4 from "../../../public/feedback/ImgFbdk4.webp";
// import Fbdk5 from "../../../public/feedback/ImgFbdk5.webp";
// import Fbdk6 from "../../../public/feedback/ImgFbdk6.webp";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css';

// const feedback = [
//     {
//         photo: Fbdk1,
//         name: 'Liam Bennett',
//         text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
//     },
//     {
//         photo: Fbdk2,
//         name: 'Olivia Hayes',
//         text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
//     },
//     {
//         photo: Fbdk3,
//         name: 'Noah Sullivan',
//         text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
//     },
//     {
//         photo: Fbdk4,
//         name: 'Jane Cooper',
//         text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
//     },
//     {
//         photo: Fbdk5,
//         name: 'Ava Mitchell',
//         text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
//     },
//     {
//         photo: Fbdk6,
//         name: 'Ethan Brooks',
//         text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
//     },
// ]

// const Feedback = () => {
//     return (
//         <section className={stl.feedback}>
//             <Image className={stl.feedback__background} src={Background} alt="background" />
//             <section className={stl.title}>
//                 <h1 className={stl.title__text}>Feedback</h1>
//             </section>
//             <div className={stl.feedback__swiperWrapper}>
//             <Swiper
//                 modules={[Navigation, Pagination]}
//                 slidesPerView={3}
//                 spaceBetween={22}
//                 navigation
//                 loop
//                 centeredSlides={false}
//                 breakpoints={{
//                 0: { slidesPerView: 1 },
//                 768: { slidesPerView: 2 },
//                 1280: { slidesPerView: 3 },
//             }}
//             className={stl.swiper}
//              pagination={{ clickable: true }}
//             >
//            {feedback.map((item, index) => (
//             <SwiperSlide key={index}>
//             <div className={stl.feedback__item}>
//                 <div className={stl.feedback__profile}>
//                     <Image className={stl.feedback__photo} src={item.photo} alt="photo" height={56} width={56}/>
//                     <div className={stl.feedback__info}>
//                         <h3 className={stl.feedback__name}>{item.name}</h3>
//                         <div className={stl.feedback__stars}>
//                             <div className={stl.feedback__star}/>
//                             <div className={stl.feedback__star}/>
//                             <div className={stl.feedback__star}/>
//                             <div className={stl.feedback__star}/>
//                             <div className={stl.feedback__starEmpty}/>
//                         </div>
//                     </div>
//                 </div>
//                 <p className={stl.feedback__text}>{item.text}</p>
//             </div>
//             </SwiperSlide>
//             ))}
//             </Swiper>
//             </div>
//         </section>
//     );
// }

// export default Feedback;