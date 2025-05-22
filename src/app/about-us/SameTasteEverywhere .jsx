"use client";

import GraphSvg from "@/components/svg/AboutUsPageSVG/GraphSvg";
import styles from "./SameTasteEverywhere.module.scss";
import SVGComponent from "@/components/svg/AboutUsPageSVG/ThreeSvg";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

const SameTasteEverywhere = () => {
  const svgRef = useRef(null);
  const inView = useInView(svgRef);


  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2>Одинаково вкусно в Москве и Сыктывкаре</h2>
        <p>
          Кто угодно может сделать вкусную пиццу. А шеф-повар итальянского
          ресторана сделает и вовсе шедевр. Он молодец. Но представьте, что вам
          нужно сделать вкусную пиццу в сотнях пиццерий, за сотни километров
          друг от друга. Это наш случай, у нас их вон уже сколько:
        </p>
        <GraphSvg className={styles.svgGraph} />
        <p>
          Пицца должна быть вкусной и везде одинаковой. Пиццерии должны быть
          одинаково уютными, кассиры неизменно приветливыми, а курьеры —
          расторопными.
          <br />
          <br />И это как раз сложно. Но мы умеем!
        </p>
      </div>
      <div
        ref={svgRef}
        className={`${styles.svg} ${inView ? styles["in-view"] : ""}`}
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

export default SameTasteEverywhere;
