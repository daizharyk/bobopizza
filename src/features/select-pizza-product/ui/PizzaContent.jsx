"use client";
import Image from "next/image";
import styles from "./PizzaContent.module.scss";
import pizzaExtras from "@/data/pizzaExtras.json";
import AddToCartButton from "../../../shared/ui/AddToCartButton/AddToCartButton";
import PizzaExtrasSelector from "@/features/PizzaExtrasSelector/PizzaExtrasSelector";
import { usePizzaSelection } from "../model/usePizzaSelection";

const PizzaModal = ({ item, onClose }) => {
  const {
    thicknessOptions,
    selectedSize,
    setSelectedSize,
    selectedExtras,
    toggleExtra,
    selectedThickness,
    setSelectedThickness,
    indicatorRef,
    sizeIndicatorRef,
    sizeGroupRef,
    sizeLabelRefs,
    traditionalRef,
    thinRef,
    groupRef,
    totalPrice,
    handleAddToCart,
    selectedVariant,
  } = usePizzaSelection(item, onClose);

  return (
    <div className={styles.content}>
      <div className={styles.content_img}>
        <div className={styles.content_img__inner}>
          <Image
            width={480}
            height={480}
            src={item.image}
            alt="Изображение пиццы"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.conten__info_wrapper}>
        <div className={styles.content_info}>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.pizza_info}>
            {`${selectedSize} ${selectedVariant.sizeUnit}, ${selectedThickness.value} тесто, ${selectedVariant?.weight} ${selectedVariant?.weightUnit}`}
          </div>
          <p className={styles.ingredients}>{item.ingredients}</p>
          <div ref={sizeGroupRef} className={styles.sizeGroup}>
            <div ref={sizeIndicatorRef} className={styles.selected_Size}></div>
            {item.variants.map((variant, index) => (
              <div key={index} className={styles.sizeItem}>
                <input
                  type="radio"
                  id={`size-${index}`}
                  name="pizza-size"
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
                  {variant.size}
                </label>
              </div>
            ))}
          </div>
          <div ref={groupRef} className={styles.thicknessGroup}>
            <div ref={indicatorRef} className={styles.selected}></div>

            {thicknessOptions.map((option) => (
              <div className={styles.wrapper_option} key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  name="thickness"
                  value={option.value}
                  className={styles.hiddenInput}
                  checked={selectedThickness === option.value}
                  onChange={() => setSelectedThickness(option)}
                />
                <label
                  ref={option.key === "traditional" ? traditionalRef : thinRef}
                  htmlFor={option.value}
                  className={styles.thicknessOption}
                >
                  {option.value}
                </label>
              </div>
            ))}
          </div>
          <PizzaExtrasSelector
            pizzaExtras={pizzaExtras}
            selectedExtras={selectedExtras}
            toggleExtra={toggleExtra}
            variant="pizza"
          />
        </div>
        <div className={styles.fixed_button_wrapper}>
          {" "}
          <AddToCartButton
            className={styles.to_cart_button}
            totalPrice={totalPrice}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
