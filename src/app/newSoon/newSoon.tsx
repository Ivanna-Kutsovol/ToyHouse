import React from "react";
import Image from "next/image";
import stl from "./newSoon.module.scss";

const Carusel = [
  { img: "/newSoon/capibara.png" },
  { img: "/newSoon/cats.png" },
  { img: "/newSoon/rabbit.png" },
  { img: "/newSoon/capibara.png" },
  { img: "/newSoon/cats.png" },
  { img: "/newSoon/rabbit.png" }
];

const NewSoon = () => {
  const doubled = [...Carusel, ...Carusel];

  return (
    <div className={stl.newSoon}>
      <section className={stl.title}>
        <h1 className={stl.title__text}>New In Soon</h1>
      </section>

      <div className={stl.newSoon__carusel}>
        <div className={stl.newSoon__track}>
          {doubled.map((item, index) => (
            <div className={stl.newSoon__item} key={index}>
              <div className={stl.newSoon__img}>
                <Image src={item.img} alt="img" width={200} height={250} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewSoon;