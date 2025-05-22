"use client";

import SecondSvg from "@/components/svg/AboutUsPageSVG/SecondSvg";
import styles from "./Ingredients.module.scss";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

export default function Ingredients() {
  const ref = useRef(null);

  const inView = useInView(ref);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2>Идеальные ингредиенты</h2>
        <p>
          Почему мы так хотим познакомиться? Потому что дальше пицца делает всё
          сама. Люди видят, что она вкусная, и возвращаются снова. Нам главное
          первый раз это показать.
          <br />
          <br />
          Вообще пицца — очень простая штука, её сложно испортить. Достаточно
          хороших ингредиентов и правильного теста. Это конструктор, если детали
          качественные, то и результат будет в порядке. Вот они, наши детали:
        </p>
        <div className={styles.sectionTwo}>
          <div className={styles.ingredientWrapper}>
            <div className={styles.ingredient}>
              <h3>Тесто</h3>
              <br />
              Самая тонкая вещь. Главное - сделать его «живым». Это целый квест
              из граммов, градусов, процентов и часов с минутами. Процесс
              непростой, но у нас получается!
            </div>
            <div className={styles.ingredient}>
              <h3>Моцарелла</h3>
              <br />
              Сыр в пицце - ключевой ингредиент. Мы используем настоящую
              моцареллу от российских поставщиков. Сыр должен тянуться, как на
              картинке.
            </div>
            <div className={styles.ingredient}>
              <h3>Начинка</h3>
              <br />
              Есть два главных правила вкусной начинки: не экономить на начинке;
              фанатично соблюдать режим хранения. Это и весь секрет.
            </div>
            <div className={styles.ingredient}>
              <h3>Томатный соус</h3>
              <br />
              лавное, что нужно знать про хороший томатный соус: он должен быть
              сделан из томатов. Звучит логично, но задумайтесь!
            </div>
          </div>
          <div
            ref={ref}
            className={`${styles.svgSec} ${inView ? styles["in-view"] : ""}`}
          >
            <SecondSvg
              classOne={styles.secSvgOne}
              classTwo={styles.secSvgTwo}
              classThree={styles.secSvgThree}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
