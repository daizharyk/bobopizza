"use client";
import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import styles from "./PizzaModal.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import pizzaExtras from "@/data/pizzaExtras.json";
import SelectedSvg from "@/components/svg/ModalSvg/SelectedSvg";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/components/utils/addItemToCart";
import AddToCartButton from "../AddToCartButton";

const PizzaModal = ({ item, onClose }) => {
  const dispatch = useDispatch();

  const thicknessOptions = [
    { value: "Традиционное", key: "traditional" },
    { value: "Тонкое", key: "thin" },
  ];

  const [selectedSize, setSelectedSize] = useState(
    item.variants[1]?.size || ""
  );
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [selectedThickness, setSelectedThickness] = useState(
    thicknessOptions[0]
  );

  const indicatorRef = useRef(null);
  const sizeIndicatorRef = useRef(null);

  const sizeGroupRef = useRef(null);
  const sizeLabelRefs = useRef([]);

  const traditionalRef = useRef(null);
  const thinRef = useRef(null);
  const groupRef = useRef(null);

  const selectedExtrasTitles = pizzaExtras
    .filter((extra) => selectedExtras.includes(extra.id))
    .map((extra) => extra.title)
    .join(", ");

  const toggleExtra = (id) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedVariant = item.variants?.find(
    (variant) => variant.size === selectedSize
  );

  const totalPrice = useMemo(() => {
    const totalExtrasPrice = pizzaExtras
      .filter((extra) => selectedExtras.includes(extra.id))
      .reduce((sum, extra) => sum + Number(extra.price), 0);

    return totalExtrasPrice + Number(selectedVariant?.price || 0);
  }, [selectedExtras, selectedVariant]);

  const customId = `${item.id}_${selectedVariant.size}_${
    selectedThickness.key
  }_${selectedExtras.sort().join("-")}`;

  const pizzaToAdd = {
    id: customId,
    title: item.title,
    image: item.image,
    size: selectedVariant.size,
    price: totalPrice,
    thickness: selectedThickness,
    extras: selectedExtrasTitles,
    customizable: item.customizable,
  };

  const handleAddToCart = () => {
    addItemToCart(dispatch, pizzaToAdd, onClose);
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
      setTimeout(updatePosition, 200);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [selectedSize, item.variants]);

  useEffect(() => {
    const currentRef =
      selectedThickness.key === "traditional" ? traditionalRef : thinRef;
    const indicator = indicatorRef.current;
    const group = groupRef.current;

    if (currentRef.current && indicator && group) {
      const option = currentRef.current;
      const groupRect = group.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();

      const offsetLeft = optionRect.left - groupRect.left;

      indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    }
  }, [selectedThickness]);

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.content_img}>
          <Image
            width={480}
            height={480}
            src={item.image}
            alt="Изображение пицы"
            style={{
              transform:
                selectedSize === "35"
                  ? "scale(1)"
                  : selectedSize === "30"
                  ? "scale(0.8)"
                  : "scale(0.7)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
        <div className={styles.conten__info_wrapper}>
          <div className={styles.content_info}>
            <h2 className={styles.title}>{item.title}</h2>
            <div className={styles.pizza_info}>
              {`${selectedSize} см, ${selectedThickness.value} тесто, ${selectedVariant?.weight} г`}
            </div>
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
                    ref={
                      option.key === "traditional" ? traditionalRef : thinRef
                    }
                    htmlFor={option.value}
                    className={styles.thicknessOption}
                  >
                    {option.value}
                  </label>
                </div>
              ))}
            </div>
            <div className={styles.extra_content}>
              <h3>Добавить по вкусу</h3>
              <section className={styles.extras_content}>
                {pizzaExtras.map((item) => {
                  const isSelected = selectedExtras.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      className={`${styles.article} ${
                        isSelected ? styles.selected : ""
                      }`}
                      onClick={() => toggleExtra(item.id)}
                    >
                      {isSelected && (
                        <div className={styles.selectedIcon}>
                          <SelectedSvg />
                        </div>
                      )}
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={88}
                        height={88}
                      />
                      <h4 className={styles.title}>{item.title}</h4>
                      <p className={styles.price}>{item.price}</p>
                    </button>
                  );
                })}
              </section>
            </div>
          </div>
          <AddToCartButton
            selectedVariant={totalPrice}
            onAddToCart={handleAddToCart}
          />
        </div>.
      </div>
    </ModalWrapper>
  );
};

export default PizzaModal;
