import { useEffect, useRef, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./CocktailModal.module.scss";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useDispatch } from "react-redux";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton";

const CocktailModal = ({ item, onClose }) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(
    item.variants[0]?.size || ""
  );

  const sizeIndicatorRef = useRef(null);

  const sizeGroupRef = useRef(null);
  const sizeLabelRefs = useRef([]);

  const customId = `${item.id}_${selectedSize}.join("-")}`;

  const selectedVariant = item.variants?.find(
    (variant) => variant.size === selectedSize
  );

  const cocktails = {
    id: customId,
    title: item.title,
    image: item.image,
    size: selectedSize,
    price: selectedVariant.price,
    customizable: item.customizable,
  };

  const handleAddToCart = () => {
    addItemToCart(dispatch, cocktails, onClose);
  };

  useEffect(() => {
    const indicator = sizeIndicatorRef.current;
    const group = sizeGroupRef.current;

    if (!indicator || !group || !selectedSize) return;

    const updatePosition = () => {
      const index = item.variants.findIndex(
        (variant) => variant.size === selectedSize
      );
      const option = sizeLabelRefs.current[index];
      if (!option) return;

      const groupRect = group.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();
      const offsetLeft = optionRect.left - groupRect.left;

      indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    };

    const animationFrame = requestAnimationFrame(() => {
      setTimeout(updatePosition);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [selectedSize, item.variants]);

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.content_img}>
          <Image
            width={480}
            height={480}
            src={item.image}
            alt="Изображение коктейля"
          />
        </div>
        <div className={styles.conten__info_wrapper}>
          <div className={styles.content_info}>
            <h2 className={styles.title}>{item.title}</h2>
            <div className={styles.info}>{`${selectedSize} л`}</div>
            <p className={styles.ingredients}>{item.ingredients}</p>
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
          </div>
          <AddToCartButton
            selectedVariant={selectedVariant.price}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CocktailModal;
