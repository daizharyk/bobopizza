"use client";

import Image from "next/image";
import styles from "./Cart.module.scss";
import Sauces from "./Sauces";
import { CartCloseSVG } from "../svg/CartCloseSVG";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { MinusSvg } from "../svg/MinusSvg";
import { PlusSvg } from "../svg/PlusSvg";

const itemsList = [
  {
    id: 1,
    title: "Креветки с песто",
    price: "500",
    image: "https://i.ibb.co.com/zgXqgQq/krevertka-Spesto30sm.webp",
    ingredients:
      "Томатный соус, моцарелла, соус песто, томаты, креветки, шампиньоны, итальянские травы",
    variants: [
      {
        size: "25 см",
        price: "3390",
        weight: "",
      },
      {
        size: "30 см",
        price: "4950",
        weight: "630 г",
      },
      {
        size: "35 см",
        price: "6130",
        weight: "",
      },
    ],
  },
  {
    id: 2,
    title: "Чикен бургер",
    price: "500",
    image: "https://i.ibb.co.com/cczMNDbM/chiken-Burger35.webp",
    ingredients:
      "Цыпленок, чеснок, томаты, моцарелла, соус бургер, соус альфредо",
    variants: [
      {
        size: "25 см",
        price: "2290",
        weight: "",
      },
      {
        size: "30 см",
        price: "3390",
        weight: "540 г",
      },
      {
        size: "35 см",
        price: "3990",
        weight: "",
      },
    ],
  },
];

const Cart = ({ isOpen, onClose }) => {
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

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !isBrowser) return null;

  const modalContent = (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <section className={styles.cart}>
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
                {" "}
                <div>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                  />{" "}
                  <div className={styles.itemInfoWrapper}>
                    <div className={styles.itemName}>{item.title}</div>
                    <div className={styles.itemInfo}>1 шт</div>
                  </div>
                </div>
                <div>
                  <div className={styles.price}>{item.price}</div>
                  <div>
                    <button>
                      <MinusSvg />
                    </button>
                    <div>1</div>
                    <button>
                      <PlusSvg />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.addToOrder}>
            <h3>Добавить к заказу?</h3>
            <Sauces />
          </div>
        </div>
      </section>
    </>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default Cart;
