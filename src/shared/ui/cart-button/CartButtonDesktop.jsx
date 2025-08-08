import { useSelector } from "react-redux";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./CartButtonDesktop.module.scss";
import { useCart } from "@/app/context/CartContext";

export default function CartButtonDesktop() {
  const { isOpen, setIsOpen } = useCart(); 



  const [isHovered, setIsHovered] = useState(false);
  const itemsList = useSelector((state) => state.cart.items);
  const totalQuantity = itemsList.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <button
      className={styles.cartButton}
      onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <span className={styles.text}>Корзина</span>
      {totalQuantity > 0 && (
        <span className={styles.countWrapper}>
          <span className={`${styles.count} ${isHovered ? styles.hidden : ""}`}>
            | {totalQuantity}
          </span>
          <span
            className={`${styles.arrow} ${isHovered ? styles.visible : ""}`}
          >
            | <FaArrowRight />
          </span>
        </span>
      )}
    </button>
  );
}
