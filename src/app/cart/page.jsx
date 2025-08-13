import BurgerMenu from "@/widgets/Header/ui/Header/BurgerMenu/BurgerMenu";
import styles from "./page.module.scss";
import LogoFullSvg from "@/components/svg/LogoFullSvg";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";
import Cart from "@/entites/cart/ui/Cart";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cartTop}>
        <ArrowLeft className={styles.arrow} />
        <LogoFullSvg className={styles.logo} />
        <BurgerMenu />
      </div>
      <Cart />
    </div>
  );
};

export default page;
