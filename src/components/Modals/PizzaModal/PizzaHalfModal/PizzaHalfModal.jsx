import React, { useEffect, useRef, useState } from "react";
import ModalWrapper from "../../ModalWrapper";
import styles from "./PizzaHalfModal.module.scss";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useDispatch } from "react-redux";
import Image from "next/image";

import data from "@/data/data.json";
import PizzaSvg from "@/components/svg/ModalSvg/PizzaSvg";
import { useInView } from "@/hooks/useInView";
import AddToCartButton from "../../AddToCartButton"; // путь должен быть корректным

const pizzas = data["pizzas"];

const thicknessOptions = [
  { value: "Традиционное", key: "traditional" },
  { value: "Тонкое", key: "thin" },
];

const PizzaHalfModal = ({ item, onClose }) => {
  const refs = useRef([]);

  const inView = pizzas.map((_, i) =>
    useInView((refs.current[i] ||= React.createRef()))
  );

  const [selectedThickness, setSelectedThickness] = useState(
    thicknessOptions[0]
  );
  const [leftPizzaHalf, setLeftPizzaHalf] = useState(null);
  const [rightPizzaHalf, setRightPizzaHalf] = useState(null);
  const [selectedSides, setSelectedSides] = useState({
    left: null,
    right: null,
  });
  console.log("selectedside", selectedSides);

  const dispatch = useDispatch();

  const groupRef = useRef(null);
  const traditionalRef = useRef(null);
  const thinRef = useRef(null);
  const indicatorRef = useRef(null);

  const customId = `${item.id}_${selectedThickness}.join("-")}`;

  const halfPizza = {
    id: customId,
    title: item.title,
    image: item.image,
    // price: selectedVariant.price,
    customizable: item.customizable,
  };

  const handlePizzaClick = (pizza) => {
    setSelectedSides((prev) => {
      // Удалить, если уже выбрана
      if (prev.left?.id === pizza.id) {
        return { ...prev, left: null };
      }

      if (prev.right?.id === pizza.id) {
        return { ...prev, right: null };
      }

      // Если обе стороны выбраны — начать заново с новой пиццы на left
      if (prev.left && prev.right) {
        return { left: pizza, right: null };
      }

      // Добавить на пустую сторону
      if (!prev.left) return { ...prev, left: pizza };
      if (!prev.right) return { ...prev, right: pizza };

      return prev;
    });
  };

  const handleAddToCart = () => {};
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
                {inView[index] && (
                  <>
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
                  </>
                )}
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
                {selectedSides.left && (
                  <Image
                    src={selectedSides.left.image}
                    alt={selectedSides.left.title}
                    width={128}
                    height={128}
                  />
                )}

                <PizzaSvg className={styles.pizza_svg} />
                <div className={styles.pizza_label}>Выбери левую половинку</div>
              </div>
              <div className={styles.pizza_label_wrapper}>
                <PizzaSvg className={styles.pizza_svg} />
                <div className={styles.pizza_label}>
                  Выбери правую половинку
                </div>
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
            <AddToCartButton
              onAddToCart={handleAddToCart}
              selectedVariant={999}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default PizzaHalfModal;
