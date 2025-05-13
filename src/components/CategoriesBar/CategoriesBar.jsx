"use client";

import Link from "next/link";
import LogoSvg from "../svg/LogoSvg";
import styles from "./CategoriesBar.module.scss";
import data from "@/data/data.json";

const categories = data["categories"];

const CategoriesBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesWrapper}>
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
  );
};

export default CategoriesBar;
