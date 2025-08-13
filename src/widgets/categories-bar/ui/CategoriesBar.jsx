"use client";

import Link from "next/link";
import LogoSvg from "../../../components/svg/LogoSvg";
import styles from "./CategoriesBar.module.scss";
import data from "@/data/data.json";
import { useEffect, useRef, useState } from "react";

import CartButton from "@/shared/ui/cart-button/CartButton";
import { useCart } from "@/app/context/CartContext";
import CartModal from "@/features/cart-modal/ui/CartModal";

const categories = data["categories"];

const CategoriesBar = () => {
  const { isOpen, setIsOpen } = useCart();
  const [isSticky, setIsSticky] = useState(false);

  const [activeCategory, setActiveCategory] = useState(null);

  const categoryRefs = useRef({});
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
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

      setActiveCategory(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeCategory && categoryRefs.current[activeCategory]) {
      categoryRefs.current[activeCategory].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

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
              transform: `translateX(${isSticky ? 0 : -60}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            <LogoSvg className={styles.logo} />
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
