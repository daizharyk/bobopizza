"use client";

import Link from "next/link";
import LogoSvg from "../svg/LogoSvg";
import styles from "./CategoriesBar.module.scss";
import data from "@/data/data.json";
import { useEffect, useRef, useState } from "react";

const categories = data["categories"];

const CategoriesBar = () => {
  const containerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = containerRef.current?.getBoundingClientRect().top;
      setIsSticky(top <= 0);
      containerRef.current.position;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={containerRef}
      className={`${styles.container} ${isSticky ? styles["blur-active"] : ""}`}
    >
      <div className={styles.wrapper}>
        <div
          className={styles.categoriesWrapper}
          style={{
            transform: `translateX(${isSticky ? 0 : -50}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          <LogoSvg className={styles.logo} />
          <nav className={styles.categories}>
            <ul>
              {categories.map((categori, index) => (
                <li key={index}>{categori.label}</li>
              ))}
            </ul>
          </nav>
          <Link href="/bonusactions">Акции</Link>
        </div>

        <button>Корзина</button>
      </div>
    </nav>
  );
};

export default CategoriesBar;
