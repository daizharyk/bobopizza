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
          <Link href={"/"}>
            <div className={styles.logoTitle}>
              <LogoSvg />

              <div className={styles.sloganLine1}>
                Сеть №1 в Казахстане <span>по количеству пиццерий</span>
              </div>
            </div>
          </Link>
          <div className={styles.deliveryInfo}>
            <div className={styles.region}>
              Доставка пиццы <span>Атырау</span>
            </div>
            <div className={styles.ratingStar}>
              26 мин 4.84 <RaitingStarSvg />
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.coinWrapper}>
            <DodoCoinSvg className={styles.dodoCoinIcon} />
            <Link href="/dodocoin" className={styles.dodoCoinLink}>
              Додокоины
            </Link>
          </div>

          <button>Войти</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
