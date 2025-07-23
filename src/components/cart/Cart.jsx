"use client";

import Image from "next/image";
import styles from "./Cart.module.scss";
import Sauces from "./Sauces";
import { CartCloseSVG } from "../svg/CartCloseSVG";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { MinusSvg } from "../svg/MinusSvg";
import { PlusSvg } from "../svg/PlusSvg";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";
import EmptyCartMessage from "./EmptyCartMessage";
import ArrowLeft from "../svg/ArrowLeftSvg";

const Cart = ({ isOpen, onClose }) => {
  const itemsList = useSelector((state) => state.cart.items);
  const [isBrowser, setIsBrowser] = useState(false);
  const [openSauces, setOpenSauces] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const getTotalPrice = (items) => {
    return items.reduce((sum, item) => {
      const price = Number(item.price ? item.price : item.variants[0].price);
      const quantity = item.quantity || 1;
      return sum + (isNaN(price) ? 0 : price * quantity);
    }, 0);
  };
  const getWordForm = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) return "товар";
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
      return "товара";
    return "товаров";
  };

  const freeDelivery = () => {
    const total = getTotalPrice(itemsList);
    const minDelivery = 3500;
    if (total >= minDelivery) {
      return "";
    } else {
      const remaining = minDelivery - total;
      return `До минимальной суммы на доставку ${remaining} тг`;
    }
  };



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
      <div className={styles.overlay} onClick={onClose}>
        {" "}
      </div>
      <section
        className={`${styles.cart} ${openSauces ? styles.cartBlur : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <CartCloseSVG className={styles.svgIcon} />
        </button>
        {itemsList.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <>
            <div className={styles.container}>
              <div className={styles.countWrapper}>
                <div className={styles.item_count}>
                  {itemsList.length} {getWordForm(itemsList.length)} на{" "}
                  {getTotalPrice(itemsList)} тг.
                </div>
                <div className={styles.minDelivery}>{freeDelivery()}</div>
              </div>
              <div className={styles.itemsList}>
                {itemsList.map((item) => (
                  <article key={item.id} className={styles.itemCart}>
                    <div className={styles.itemTop}>
                      {item.half ? (
                        <div className={styles.half_pizza_img}>
                          <Image
                            src={item.leftImage}
                            alt={item.title}
                            width={64}
                            height={64}
                            className={styles.leftImage}
                          />
                          <Image
                            src={item.rightImage}
                            alt={item.title}
                            width={64}
                            height={64}
                            className={styles.rightImage}
                          />
                        </div>
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={64}
                          height={64}
                          className={styles.itemImage}
                        />
                      )}

                      <div className={styles.itemInfoWrapper}>
                        <div className={styles.itemName}>{item.title}</div>
                        {item.comboItems ? (
                          <div className={styles.comboDetails}>
                            {item.comboItems.map((comboItem, i) => (
                              <div key={i} className={styles.comboItem}>
                                <div className={styles.itemName}>
                                  {" "}
                                  {comboItem.title}
                                </div>
                                <div className={styles.itemSize}>
                                  {comboItem.size}
                                  {comboItem.sizeUnit &&
                                    ` ${comboItem.sizeUnit}`}{" "}
                                  {comboItem.thickness &&
                                    `, ${comboItem.thickness.value} тесто`}
                                  {comboItem.weight && comboItem.weightUnit
                                    ? `, ${comboItem.weight} ${comboItem.weightUnit}`
                                    : ""}
                                </div>
                                {comboItem.extras &&
                                  comboItem.extras.length > 0 && (
                                    <div className={styles.extras}>
                                      + {comboItem.extras.join(", ")}
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        ) : item.customizable ? (
                          <div className={styles.itemDetails}>
                            <div className={styles.itemSize}>
                              {`${item.size} ${item.sizeUnit}`}
                              {item.weight &&
                                item.weightUnit &&
                                `, ${item.weight} ${item.weightUnit}`}
                              {item.thickness?.value &&
                                `, ${item.thickness.value} тесто`}
                            </div>
                            {item.extras && (
                              <div className={styles.extras}>
                                + {item.extras}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className={styles.itemSize}>1 шт</div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteFromCart(item.id)}
                        className={styles.itemDeleteButton}
                      >
                        <CartCloseSVG className={styles.svgIcon} />
                      </button>
                    </div>

                    <div className={styles.itemBotton}>
                      <div className={styles.price}>
                        {(item.price * item.quantity)
                          .toLocaleString("ru-RU")
                          .replace(/(\d)(\d{3})$/, "$1 $2")}{" "}
                        тг.
                      </div>

                      <div className={styles.quantityControls}>
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className={styles.minusButton}
                        >
                          <MinusSvg />
                        </button>
                        <div className={styles.quantity}>{item.quantity}</div>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className={styles.plusButton}
                        >
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
          </>
        )}
        {itemsList.length > 0 && (
          <div className={styles.toOrder}>
            <div className={styles.item_count}>
              <div>
                {itemsList.length} {getWordForm(itemsList.length)}
              </div>
              <div>{getTotalPrice(itemsList)} тг.</div>
            </div>

            <div className={styles.totalPrice}>
              <span>Сумма заказа:</span>
              <span>{getTotalPrice(itemsList)} тг.</span>
            </div>

            <button className={styles.toOrderButton}>
              К оформлению заказа <ArrowLeft className={styles.arrow} />
            </button>
          </div>
        )}
      </section>

      <Sauces
        itemsList={itemsList}
        openSauces={openSauces}
        onClose={() => setOpenSauces(false)}
      />
    </>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default Cart;
