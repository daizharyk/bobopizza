import Link from "next/link";
import LogoSvg from "../../../components/svg/LogoSvg";
import styles from "./CategoriesBar.module.scss";

import CartButton from "@/shared/ui/cart-button/CartButton";
import { useCart } from "@/app/context/CartContext";
import CartModal from "@/features/cart-modal/ui/CartModal";
import { useCategoriesBar } from "../modal/useCategoriesBar";
import { categories } from "../lib/categories";

const CategoriesBar = () => {
  const { isSticky, sentinelRef, activeCategory, categoryRefs } =
    useCategoriesBar();

  const { isOpen, setIsOpen } = useCart();

  return (
    <>
      <div ref={sentinelRef} style={{ height: 1 }}></div>
      <nav
        className={`${styles.container} ${
          isSticky ? styles["blur-active"] : ""
        }`}
      >
        <div className={styles.wrapper}>
          <div
            className={styles.categoriesWrapper}
            style={{
              transform: `translateX(${isSticky ? 30 : 0}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            {isSticky && <LogoSvg className={styles.logo} />}
            <nav className={styles.categories}>
              <ul>
                {categories.map((categori, index) => (
                  <li
                    key={index}
                    ref={(el) => (categoryRefs.current[categori.targetId] = el)}
                  >
                    <Link
                      href={`/#${categori.targetId}`}
                      className={`${styles.categoryButton} ${
                        activeCategory === categori.targetId
                          ? styles.active
                          : ""
                      }`}
                    >
                      {categori.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link href="/bonusactions">Акции</Link>
          </div>
          <CartButton />
        </div>
      </nav>
      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CategoriesBar;
