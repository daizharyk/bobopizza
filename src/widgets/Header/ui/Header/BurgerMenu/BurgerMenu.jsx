"use client";
import Link from "next/link";
import styles from "./BurgerMenu.module.scss";
import HeaderTop from "../../HeaderTop/HeaderTop";

import RaitingStarSvg from "../../../../../components/svg/RaitingStarSvg";
import { LocationSvg } from "@/components/svg/LocationSvg";
import AppStoreSvg from "@/components/svg/AppStoreSvg";
import PlayMarketSvg from "@/components/svg/PlayMarketSvg";
import LogoSvg from "@/components/svg/LogoSvg";
import { useEffect, useState } from "react";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.burger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isOpen && (
        <div className={styles.burgerMenu}>
          <div className={styles.logoWrapper}>
            <LogoSvg className={styles.logo} />
            <span>ДОДО ПИЦЦА</span>
          </div>
          <div className={styles.line}>
            <button className={styles.location}>
              <LocationSvg className={styles.locationIcon} />
              <div className={styles.city}>
                <div className={styles.cityName}>Атырау</div>
                <div className={styles.changeButton}>Изменить</div>
              </div>
            </button>
            <div className={styles.ratingStar}>
              26 мин 4.84 <RaitingStarSvg />
            </div>
          </div>

          <HeaderTop />
          <div className={styles.bottomLinks}>
            <div className={styles.phoneLink}>
              <a href="tel:+7719444004"> +7 (771) 944-40-04</a>
              <span>Звонок по телефону</span>
            </div>
            <AppStoreSvg />
            <PlayMarketSvg />
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
