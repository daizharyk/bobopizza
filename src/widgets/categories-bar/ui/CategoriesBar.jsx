"use client";

import Link from "next/link";
import LogoSvg from "../../../components/svg/LogoSvg";
import styles from "./CategoriesBar.module.scss";
import data from "@/data/data.json";
import { useEffect, useRef, useState } from "react";
import Cart from "../../../components/cart/Cart";
import { useSelector } from "react-redux";
import CartButton from "@/shared/ui/cart-button/CartButton";
import { useCart } from "@/app/context/CartContext";

const categories = data["categories"];

const CategoriesBar = () => {
  const { isOpen, setIsOpen } = useCart();
  const [isSticky, setIsSticky] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const itemsList = useSelector((state) => state.cart.items);

  const containerRef = useRef(null);
  const totalQuantity = itemsList.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      const top = containerRef.current?.getBoundingClientRect().top;
      setIsSticky(top <= 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={containerRef}
        className={`${styles.container} ${
          isSticky ? styles["blur-active"] : ""
        }`}
      >
        <div className={styles.wrapper}>
          <div
            className={styles.categoriesWrapper}
            style={{
              transform: `translateX(${isSticky ? 0 : -50}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            <LogoSvg className={styles.logo} />
            <nav className={styles.categories}>
              <ul>
                {categories.map((categori, index) => (
                  <li key={index}>
                    <Link
                      href={`/#${categori.targetId}`}
                      className={styles.categoryButton}
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
      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CategoriesBar;
