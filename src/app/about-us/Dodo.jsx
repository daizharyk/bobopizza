"use client";

import SVGComponent from "@/components/svg/AboutUsPageSVG/FirstSvg";
import styles from "./Dodo.module.scss";
import { useInView } from "@/hooks/useInView";
import { useRef } from "react";

const Dodo = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1>Мы</h1>
        <p>
          Обычно люди приходят в Додо Пиццу, чтобы просто поесть. Наши
          промоутеры раздают листовки про кусочек пиццы за 100 тенге или ещё
          что-то выгодное. Мы делаем это как первый шаг, чтобы познакомиться.
          <br />
          <br />
          Но для нас Додо — не только пицца. Это и пицца тоже, но в первую
          очередь это большое дело, которое вдохновляет нас, заставляет каждое
          утро просыпаться и с интересом продолжать работу.
          <br />
          <br />В чём же наш интерес? Сейчас расскажем.
        </p>
      </div>
      <div
        className={`${styles.svg} ${inView ? styles["in-view"] : ""}`}
        ref={ref}
      >
        <SVGComponent
          classOne={styles.svgOne}
          classTwo={styles.svgTwo}
          classThree={styles.svgThree}
        />
      </div>
    </section>
  );
};
export default Dodo;
