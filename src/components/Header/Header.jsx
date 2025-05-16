import Link from "next/link";
import styles from "./Header.module.scss";
import HeaderTop from "../HeaderTop/HeaderTop";
import LogoSvg from "../svg/LogoFullSvg";
import RaitingStarSvg from "../svg/RaitingStarSvg";
import DodoCoinSvg from "../svg/DodoCoinSvg";

const Header = () => {
  return (
    <div className={styles.container}>
      <HeaderTop />
      <header>
        <div className={styles.headerLeft}>
          <div className={styles.logoTitle}>
            <LogoSvg />
            <div className={styles.sloganLine1}>
              Сеть №1 в Казахстане <span>по количеству пиццерий</span>
            </div>
          </div>

          <div className={styles.deliveryInfo}>
            Доставка пиццы Атырау
            <span className={styles.ratingStar}>
          
              26 мин 4.84 <RaitingStarSvg />
            </span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.coinWrapper}>
            <DodoCoinSvg />
            <Link href="/dodocoin">Додокоины</Link>
          </div>

          <button>Войти</button>
        </div>
      </header>

    </div>
  );
};

export default Header;
