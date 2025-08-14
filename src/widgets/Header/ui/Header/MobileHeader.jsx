"use client";
import Link from "next/link";
import styles from "./MobileHeader.module.scss";

import LogoSvg from "../../../../components/svg/LogoSvg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const MobileHeader = () => {
  return (
    <header className={styles.container}>
      <Link className={styles.logoWrapper} href={"/"}>
        <LogoSvg className={styles.logo} />
        <span>ДОДО ПИЦЦА</span>
      </Link>
      <BurgerMenu className={styles.wrapper} />
    </header>
  );
};

export default MobileHeader;
