import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import styles from "./PizzaModal.module.scss";
import { useEffect, useRef, useState } from "react";
import pizzaExtras from "@/data/pizzaExtras.json";

const PizzaModal = ({ item, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(
    item.variants[1]?.size || ""
  );
  const [selectedThickness, setSelectedThickness] = useState("Традиционное");

  const indicatorRef = useRef(null);
  const sizeIndicatorRef = useRef(null);

  const sizeGroupRef = useRef(null);
  const sizeLabelRefs = useRef([]);

  const traditionalRef = useRef(null);
  const thinRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const indicator = sizeIndicatorRef.current;
    const group = sizeGroupRef.current;

    if (!indicator || !group || !selectedSize) return;

    const index = item.variants.findIndex(
      (variant) => variant.size === selectedSize
    );

    const option = sizeLabelRefs.current[index];
    console.log("option", option);

    if (option) {
      const groupRect = group.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();
      const offsetLeft = optionRect.left - groupRect.left;

      indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    }
  }, [selectedSize, item.variants]);

  useEffect(() => {
    const currentRef =
      selectedThickness === "Традиционное" ? traditionalRef : thinRef;
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
          />
        </div>
        <div className={styles.content_info}>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.pizza_info}>
            {`${selectedSize}, ${selectedThickness} тесто, 630 г`}
          </div>
          <p>{item.ingredients}</p>
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

            <input
              type="radio"
              id="Традиционное"
              name="thickness"
              value="Традиционное"
              className={styles.hiddenInput}
              checked={selectedThickness === "Традиционное"}
              onChange={() => setSelectedThickness("Традиционное")}
            />
            <label
              ref={traditionalRef}
              htmlFor="Традиционное"
              className={styles.thicknessOption}
            >
              Традиционное
            </label>

            <input
              type="radio"
              id="Тонкое"
              name="thickness"
              value="Тонкое"
              className={styles.hiddenInput}
              checked={selectedThickness === "Тонкое"}
              onChange={() => setSelectedThickness("Тонкое")}
            />
            <label
              ref={thinRef}
              htmlFor="Тонкое"
              className={styles.thicknessOption}
            >
              Тонкое
            </label>
          </div>
          <div className={styles.extra_content}>
            <h3>Добавить по вкусу</h3>
            <section className={styles.extras_content}>
              {pizzaExtras.map((item) => (
                <button className={styles.article} key={item.id}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={88}
                    height={88}
                  />
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.price}>{item.price}</p>
                </button>
              ))}
            </section>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default PizzaModal;
