"use client";

import Link from "next/link";
import LogoSvg from "../../../components/svg/LogoSvg";
import styles from "./CategoriesBar.module.scss";
import data from "@/data/data.json";
import { useEffect, useRef, useState } from "react";
import Cart from "../../../components/cart/Cart";

import CartButton from "@/shared/ui/cart-button/CartButton";
import { useCart } from "@/app/context/CartContext";

const categories = data["categories"];

const CategoriesBar = () => {
  const { isOpen, setIsOpen } = useCart();
  const [isSticky, setIsSticky] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let active = null;

      for (let i = 0; i < categories.length; i++) {
        const el = document.getElementById(categories[i].targetId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            active = categories[i].targetId;
            break;
          }
        }
      }

      setActiveCategory(active); // даже если null
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

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
      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CategoriesBar;
