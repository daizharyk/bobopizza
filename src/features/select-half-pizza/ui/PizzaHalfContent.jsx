"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PizzaHalfContent.module.scss";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useDispatch } from "react-redux";
import Image from "next/image";

import data from "@/data/data.json";
import PizzaSvg from "@/components/svg/ModalSvg/PizzaSvg";
import AddToCartButton from "../../../shared/ui/AddToCartButton/AddToCartButton"; // путь должен быть корректным

const pizzas = data["items"].filter((item) => item.type === "pizzas");

const thicknessOptions = [
  { value: "Традиционное", key: "traditional" },
  { value: "Тонкое", key: "thin" },
];

const PizzaHalfModal = ({ item, onClose }) => {
  const refs = useRef([]);

  ``;

  const [selectedThickness, setSelectedThickness] = useState(
    thicknessOptions[0]
  );
  const [showWarning, setShowWarning] = useState(false);

  const [selectedSides, setSelectedSides] = useState({
    left: null,
    right: null,
  });

  const dispatch = useDispatch();

  const groupRef = useRef(null);
  const traditionalRef = useRef(null);
  const thinRef = useRef(null);
  const indicatorRef = useRef(null);

  const customId = [
    selectedThickness.key,
    selectedSides.left?.id,
    selectedSides.right?.id,
  ].join("-");

  const totalPrice = useMemo(() => {
    let price = 0;

    if (selectedSides.left) {
      price += selectedSides.left.variants[2].price / 2;
    }

    if (selectedSides.right) {
      price += selectedSides.right.variants[2].price / 2;
    }

    return Math.round(price);
  }, [selectedSides]);

  const halfPizza = {
    id: customId,
    title: `${selectedSides.left?.title} + ${selectedSides.right?.title}`,
    leftImage: selectedSides.left?.image,
    rightImage: selectedSides.right?.image,
    price: totalPrice,
    customizable: item.customizable,
    thickness: selectedThickness,
    half: true,
    size: "35",
    sizeUnit: "см",
  };

  const handleAddToCart = () => {
    if (!selectedSides.left || !selectedSides.right) {
      setShowWarning(true);

      setTimeout(() => {
        setShowWarning(false);
      }, 2000);

      return;
    }

    // Всё выбрано — добавляем в корзину
    addItemToCart(dispatch, halfPizza, onClose);
  };

  const handlePizzaClick = (pizza) => {
    setSelectedSides((prev) => {
      if (prev.left?.id === pizza.id) {
        return { ...prev, left: null };
      }

      if (prev.right?.id === pizza.id) {
        return { ...prev, right: null };
      }

      if (prev.left && prev.right) {
        return { left: pizza, right: null };
      }

      // Добавить на пустую сторону
      if (!prev.left) return { ...prev, left: pizza };
      if (!prev.right) return { ...prev, right: pizza };

      return prev;
    });
  };

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
    <div className={styles.content}>
      <div className={styles.select_half}>
        <h2 className={styles.title}>
          Выберите пиццы для левой и правой половинки
        </h2>

        <div className={styles.pizza_grid}>
          {pizzas.map((pizza, index) => (
            <div
              key={pizza.id}
              ref={refs.current[index]}
              className={styles.pizza_card}
              onClick={() => handlePizzaClick(pizza)}
            >
              <div
                className={`${
                  selectedSides.left?.id === pizza.id ||
                  selectedSides.right?.id === pizza.id
                    ? styles["selected"]
                    : ""
                }`}
              >
                {" "}
                <div
                  className={`${styles.pizza_img_wrapper} ${
                    selectedSides.left?.id === pizza.id
                      ? styles["left-selected"]
                      : selectedSides.right?.id === pizza.id
                      ? styles["right-selected"]
                      : ""
                  } `}
                >
                  <Image
                    src={pizza.image}
                    alt={pizza.title}
                    width={138}
                    height={138}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              <h3 className={styles.pizza_title}>{pizza.title}</h3>
              <div className={styles.pizza_price}>
                {pizza.variants?.[0]?.price || pizza.price} тг.
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content__info_wrapper}>
        <div className={styles.content_info}>
          <div className={styles.top_image_wrapper}>
            {" "}
            {selectedSides.left && (
              <Image
                src={selectedSides.left.image}
                alt={selectedSides.left.title}
                className={styles.left_image}
                width={256}
                height={256}
              />
            )}
            {selectedSides.right && (
              <Image
                src={selectedSides.right.image}
                alt={selectedSides.right.title}
                className={`${styles.right_image}`}
                width={256}
                height={256}
              />
            )}
            <PizzaSvg className={styles.pizza_svg_top} />
          </div>

          <div className={styles.pizza_info}>
            <div className={styles.pizza_label_wrapper}>
              <div className={styles.image_wrapper}>
                {selectedSides.left && (
                  <Image
                    src={selectedSides.left.image}
                    alt={selectedSides.left.title}
                    width={68}
                    height={68}
                    className={styles.left_image}
                  />
                )}
                <PizzaSvg
                  className={`${styles.pizza_svg} ${
                    selectedSides.left ? styles.svg_faded : ""
                  }`}
                />
              </div>
              {selectedSides.left ? (
                <div className={styles.pizza_info}>
                  <div className={styles.pizza_title}>
                    {selectedSides.left.title}
                  </div>
                  <div className={styles.ingredients_label}>
                    {selectedSides.left.ingredients}
                  </div>
                </div>
              ) : (
                <div className={styles.pizza_label}>Выбери левую половинку</div>
              )}
            </div>
            <div className={styles.pizza_label_wrapper}>
              <div className={styles.image_wrapper}>
                {selectedSides.right && (
                  <Image
                    src={selectedSides.right.image}
                    alt={selectedSides.right.title}
                    width={68}
                    height={68}
                    className={styles.right_image}
                  />
                )}
                <PizzaSvg
                  className={`${styles.pizza_svg} ${
                    selectedSides.right ? styles.svg_faded : ""
                  }`}
                />
              </div>
              {selectedSides.right ? (
                <div className={styles.pizza_info}>
                  <div className={styles.pizza_title}>
                    {selectedSides.right.title}
                  </div>
                  <div className={styles.ingredients_label}>
                    {selectedSides.right.ingredients}
                  </div>
                </div>
              ) : (
                <div className={styles.pizza_label}>
                  Выбери правую половинку
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.pizza_size_wrapper}>
          <div className={styles.sizeGroup}>
            <div className={styles.sizeLabel}>Большая 35 см</div>
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
          </div>
          <div className={styles.add_to_cart}>
            <AddToCartButton
              onAddToCart={handleAddToCart}
              totalPrice={totalPrice}
            />

            {showWarning && (
              <div className={styles.choose_notice}>
                Выберите вторую половинку
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaHalfModal;
