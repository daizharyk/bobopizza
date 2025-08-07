
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import styles from "./CartButtonMobile.module.scss";

export default function CartButtonMobile() {
  const itemsList = useSelector((state) => state.cart.items);
  const totalQuantity = itemsList.reduce((acc, i) => acc + i.quantity, 0);

  const cartButtonMobile = (
    <button className={styles.mobileCartButton}>
      {totalQuantity > 0 && (
        <span className={styles.badge}>{totalQuantity}</span>
      )}
    </button>
  );

  return createPortal(cartButtonMobile, document.getElementById("modal-root"));
}
