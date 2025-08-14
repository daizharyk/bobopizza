import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import styles from "./CartButtonMobile.module.scss";
import CartSvg from "@/components/svg/CartSvg";
import Link from "next/link";

export default function CartButtonMobile() {
  const itemsList = useSelector((state) => state.cart.items);
  const totalQuantity = itemsList.reduce((acc, i) => acc + i.quantity, 0);

  if (itemsList.length === 0) return null;
  
  const cartButtonMobile = (
    <Link href="/cart" className={styles.mobileCartButton}>
      <CartSvg />
      {totalQuantity > 0 && (
        <span className={styles.badge}>{totalQuantity}</span>
      )}
    </Link>
  );

  return createPortal(cartButtonMobile, document.getElementById("modal-root"));
}
