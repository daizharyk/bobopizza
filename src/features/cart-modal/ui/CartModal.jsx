"use client";

import styles from "./CartModal.module.scss";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Cart from "@/entites/cart/ui/Cart";

const CartModal = ({ isOpen, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen || !isBrowser) return null;

  const modalContent = (
    <>
      <div className={styles.overlay} onClick={onClose}>
        {" "}
      </div>
      <Cart onClose={onClose} />
    </>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default CartModal;
