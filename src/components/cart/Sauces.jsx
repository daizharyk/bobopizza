"use client";
import Image from "next/image";
import styles from "./Sauces.module.scss";
import data from "@/data/data.json";
import { CartCloseSVG } from "../svg/CartCloseSVG";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/entites/cart/model/cartSlice";
import { PlusSvg } from "../svg/PlusSvg";
import { MinusSvg } from "../svg/MinusSvg";
import { useEffect, useRef } from "react";
import { addItemToCart } from "../utils/addItemToCart";

const sauces = data.items.filter((item) => item.type === "sauces");

const Sauces = ({ openSauces, onClose, itemsList }) => {
  if (!openSauces) return null;



  const saucesRef = useRef(null);

  const dispatch = useDispatch();

  // const preparedItem = {
  //   id: sauces.id,
  //   title: item.title,
  //   image: item.image,
  //   size: selectedSize,
  //   sizeUnit: selectedVariant?.sizeUnit,
  //   price: selectedVariant?.price,
  //   customizable: item.customizable,
  //   type: item.type,
  // };

  const handleAddToCart = () => {
    addItemToCart(dispatch, preparedItem, onClose);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (saucesRef.current && !saucesRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={saucesRef}
      className={styles.container}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className={styles.close_button}>
        <CartCloseSVG />
      </button>
      <h3 className={styles.title}>Соусы к бортикам и закускам</h3>
      <div className={styles.sauces_wrapper}>
        {sauces.map((sauce) => {
          const sauceInCart = itemsList.find((item) => item.id === sauce.id);
          console.log("sauceInCart", sauceInCart);

          return (
            <div ef={saucesRef} key={sauce.id} className={styles.wrapper}>
              <div className={styles.img_wrapper}>
                <Image
                  src={sauce.image}
                  alt={sauce.title}
                  width={73}
                  height={73}
                />
                <div className={styles.name}>{sauce.title}</div>
              </div>

              <div className={styles.price_wrapper}>
                {sauceInCart ? (
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => dispatch(decreaseQuantity(sauce.id))}
                      className={styles.minusButton}
                    >
                      <MinusSvg />
                    </button>
                    <div className={styles.quantity}>
                      {sauceInCart.quantity}
                    </div>
                    <button
                      onClick={() => dispatch(increaseQuantity(sauce.id))}
                      className={styles.plusButton}
                    >
                      <PlusSvg />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => dispatch(addToCart(sauce))}
                    className={styles.price}
                  >
                    {sauce.variants?.[0]?.price} тг
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sauces;
