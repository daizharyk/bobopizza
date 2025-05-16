const { default: SecretBuyer } = require("../svg/SecterBuyer");
import AppStoreSvg from "../svg/AppStoreSvg";
import PlayMarketSvg from "../svg/PlayMarketSvg";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={`${styles.block} ${styles.blockTop}`}>
            <SecretBuyer className={styles.svg} />
            <div className={styles.text}>
              Проверьте нашу кухню и получите додокоины — хватит на две пиццы
            </div>
            <button>Заполнить анкету</button>
          </div>
        </div>
        <div className={styles.foterInfoWrapper}>
          <div className={`${styles.block} ${styles.blockBot}`}>
            <div className={styles.section}>
              <h3>Додо Пицца</h3>
              <ul>
                <li>
                  <Link href="/about">О нас</Link>
                </li>
                <li>
                  <Link href="/dodobook">Додо-книга</Link>
                </li>
                <li>
                  <Link href="/blog">Блог «Сила ума»</Link>
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3>Работа</h3>
              <ul>
                <li>
                  <Link href="/jobs/pizzeria">В пиццерии</Link>
                </li>
                <li>
                  <Link href="/jobs/call-center">В контакт-центре</Link>
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3>Партнерам</h3>
              <ul>
                <li>
                  <Link href="/franchise">Франшиза</Link>
                </li>
                <li>
                  <Link href="/invest">Инвестиции</Link>
                </li>
                <li>
                  <Link href="/suppliers">Поставщикам</Link>
                </li>
                <li>
                  <Link href="/offer-location">Предложить помещение</Link>
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3>Это интересно</h3>
              <ul>
                <li>
                  <Link href="/gloves">Почему мы готовим без перчаток?</Link>
                </li>
                <li>
                  <Link href="/tours">Экскурсии и мастер-классы</Link>
                </li>
              </ul>
            </div>
            <div className={styles.section}>
              <div className={styles.apps}>
                <a
                  href="https://apps.apple.com/ru/app/%D0%B4%D0%BE%D0%B4%D0%BE-%D0%BF%D0%B8%D1%86%D1%86%D0%B0-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD/id894649641?mt=8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppStoreSvg />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=ru.dodopizza.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PlayMarketSvg />
                </a>
              </div>
              <div className={styles.mail}>
                <a href="mailto:feedback@dodopizza.kz">feedback@dodopizza.kz</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
