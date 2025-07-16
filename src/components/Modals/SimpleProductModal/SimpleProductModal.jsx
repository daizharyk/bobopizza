// components/Modals/SimpleProductModal.jsx

import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import AddToCartButton from "../AddToCartButton";
import { addItemToCart } from "@/components/utils/addItemToCart";
import styles from "./SimpleProductModal.module.scss";

const SimpleProductModal = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(
    item.variants?.[0]?.size || ""
  );
  const sizeGroupRef = useRef(null);
  const sizeLabelRefs = useRef([]);
  const sizeIndicatorRef = useRef(null);

  const selectedVariant = item.variants?.find((v) => v.size === selectedSize);
  const customId = `${item.id}_${selectedSize}`;

  console.log("selectedVariant", selectedVariant);

  const preparedItem = {
    id: customId,
    title: item.title,
    image: item.image,
    size: selectedSize,
    price: selectedVariant?.price,
    customizable: item.customizable,
    type: item.type,
  };

  const handleAddToCart = () => {
    addItemToCart(dispatch, preparedItem, onClose);
  };

  useEffect(() => {
    const indicator = sizeIndicatorRef.current;
    const group = sizeGroupRef.current;
    if (!indicator || !group || !selectedSize) return;

    const updatePosition = () => {
      const index = item.variants.findIndex((v) => v.size === selectedSize);
      const option = sizeLabelRefs.current[index];
      if (!option) return;
      const groupRect = group.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();
      const offsetLeft = optionRect.left - groupRect.left;
      indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    };

    const frame = requestAnimationFrame(() => setTimeout(updatePosition));
    return () => cancelAnimationFrame(frame);
  }, [selectedSize, item.variants]);
  console.log("item", item);

  return (
    <ModalWrapper onClose={onClose}>
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
              <div className={styles.singleVariant}>
                {item.variants[0].size}
              </div>
            )}
          </div>

          <AddToCartButton
            selectedVariant={selectedVariant?.price}
            onAddToCart={handleAddToCart}
            className={styles.cartBottomSpacing}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SimpleProductModal;
