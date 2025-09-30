// components/Modals/SimpleProductModal.jsx
"use client";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AddToCartButton from "../../../shared/ui/AddToCartButton/AddToCartButton";
import { addItemToCart } from "@/components/utils/addItemToCart";
import styles from "./SimpleProductContent.module.scss";
import { useSimpleProductModal } from "../model/useSimpleProductModal";

const SimpleProductModal = ({ item, onClose }) => {
  const {
    selectedSize,
    setSelectedSize,
    selectedVariant,
    sizeGroupRef,
    sizeLabelRefs,
    sizeIndicatorRef,
    handleAddToCart,
  } = useSimpleProductModal(item, onClose);

 

  return (
    <div className={styles.content}>
      <div className={styles.content_img}>
        <Image width={480} height={480} src={item.image} alt={item.title} />
      </div>
      <div className={styles.conten__info_wrapper}>
        <div className={styles.content_info}>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.info}>
            {`${selectedSize} ${
              selectedVariant.sizeUnit ? selectedVariant.sizeUnit : ""
            }${
              selectedVariant.weight
                ? `, ${selectedVariant.weight} ${selectedVariant.weightUnit}`
                : ""
            }`}
          </div>

          <p className={styles.ingredients}>{item.ingredients}</p>
          {item.variants.length > 1 ? (
            <div ref={sizeGroupRef} className={styles.sizeGroup}>
              <div
                ref={sizeIndicatorRef}
                className={styles.selected_Size}
              ></div>
              {item.variants.map((variant, index) => (
                <div key={index} className={styles.sizeItem}>
                  <input
                    type="radio"
                    id={`size-${index}`}
                    name="size"
                    value={variant.size}
                    checked={selectedSize === variant.size}
                    onChange={() => setSelectedSize(variant.size)}
                    className={styles.hiddenInput}
                  />
                  <label
                    ref={(e) => (sizeLabelRefs.current[index] = e)}
                    htmlFor={`size-${index}`}
                    className={styles.sizeOption}
                  >
                    {variant.size} л
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.singleVariant}>{item.variants[0].size}</div>
          )}
        </div>

        <AddToCartButton
          totalPrice={selectedVariant?.price}
          onAddToCart={handleAddToCart}
          className={styles.cartBottomSpacing}
        />
      </div>
    </div>
  );
};

export default SimpleProductModal;
