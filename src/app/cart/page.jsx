"use client";

import BurgerMenu from "@/widgets/Header/ui/Header/BurgerMenu/BurgerMenu";
import styles from "./page.module.scss";
import LogoFullSvg from "@/components/svg/LogoFullSvg";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";
import Cart from "@/entites/cart/ui/Cart";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
console.log("router", router);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.cartTop}>
        <ArrowLeft className={styles.arrow} onClick={handleGoHome} />
        <LogoFullSvg className={styles.logo} />
        <BurgerMenu />
      </div>
      <Cart />
    </div>
  );
};

export default Page;
