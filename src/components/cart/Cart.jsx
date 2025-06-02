"use client";

import Image from "next/image";
import styles from "./Cart.module.scss";
import Sauces from "./Sauces";
import { CartCloseSVG } from "../svg/CartCloseSVG";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { MinusSvg } from "../svg/MinusSvg";
import { PlusSvg } from "../svg/PlusSvg";
import { useSelector } from "react-redux";

const Cart = ({ isOpen, onClose }) => {
  const itemsList = useSelector((state) => state.cart.items);
  console.log("Cart contents:", itemsList);

  const [isBrowser, setIsBrowser] = useState(false);
  const [openSauces, setOpenSauces] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      setOpenSauces(false);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !isBrowser) return null;

  const modalContent = (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <section
        className={`${styles.cart} ${openSauces ? styles.cartBlur : ""}`}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <CartCloseSVG className={styles.svgIcon} />
        </button>

        <div className={styles.container}>
          <div className={styles.countWrapper}>
            <div className={styles.item_count}>2 товара на 2 000 тг.</div>
            <div className={styles.minDelivery}>
              До минимальной суммы на доставку — 1 500 тг.
            </div>
          </div>

          <div className={styles.itemsList}>
            {itemsList.map((item) => (
              <article key={item.id} className={styles.itemCart}>
                <div className={styles.itemTop}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfoWrapper}>
                    <div className={styles.itemName}>{item.title}</div>
                    <div className={styles.itemSize}>1 шт</div>
                  </div>
                  <button className={styles.itemDeleteButton}>
                    <CartCloseSVG className={styles.svgIcon} />
                  </button>
                </div>
                <div className={styles.itemBotton}>
                  <div className={styles.itemBotton}>
                    <div className={styles.price}>
                      {(item.variants?.[0]?.price ?? item.price)
                        .toLocaleString("ru-RU")
                        .replace(/(\d)(\d{3})$/, "$1 $2")}{" "}
                      тг.
                    </div>
                  </div>

                  <div className={styles.quantityControls}>
                    <button className={styles.minusButton}>
                      <MinusSvg />
                    </button>
                    <div className={styles.quantity}>1</div>
                    <button className={styles.plusButton}>
                      <PlusSvg />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.addToOrder}>
            <h3 className={styles.title}>Добавить к заказу?</h3>
            <button
              onClick={() => setOpenSauces(true)}
              className={styles.sauces_preview}
            >
              <Image
                width={72}
                height={72}
                src={"/png/saucesPreivew.png"}
                alt="sauces Preview"
              />
              <div className={styles.sauces_text}>Соусы</div>
            </button>
          </div>
        </div>
      </section>
      <Sauces openSauces={openSauces} onClose={() => setOpenSauces(false)} />
    </>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default Cart;
