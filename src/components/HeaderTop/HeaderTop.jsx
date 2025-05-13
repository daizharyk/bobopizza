import Link from "next/link";
import styles from "./HeaderTop.module.scss";

const HeaderTop = () => {
  return (
    <div className={styles.headerTop}>
      <button className={styles.languageButton}>
        <div className={styles.languageIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="24"
            height="24"
            viewBox="0 0 25 25"
          >
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
              d="M3.664 12.438a9 9 0 1 0 18 0 9 9 0 0 0-18 0"
            ></path>
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
              d="M13.664 3.538s3 3.534 3 8.9-3 8.9-3 8.9M11.664 21.338s-3-3.533-3-8.9c0-5.366 3-8.9 3-8.9M4.664 15.438h16M4.664 9.438h16"
            ></path>
          </svg>
          <span>RU</span>
        </div>
        <div className={styles.languageLabel}>Язык</div>
      </button>
      <nav className={styles.nav}>
        <Link href="/about">О нас</Link>
        <Link href="/contacts">Контакты</Link>
      </nav>
    </div>
  );
};

export default HeaderTop;
