import { useEffect, useRef, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./PizzaHalfModal.module.scss";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useDispatch } from "react-redux";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton";
import data from "@/data/data.json";
import PizzaSvg from "@/components/svg/ModalSvg/PizzaSvg";

const pizzas = data["pizzas"];
const thicknessOptions = [
  { key: "traditional", label: "Традиционное" },
  { key: "thin", label: "Тонкое" },
];

const PizzaHalfModal = ({ item, onClose }) => {
  const [selectedThickness, setSelectedThickness] = useState(
    thicknessOptions[0]
  );
  const dispatch = useDispatch();

  const groupRef = useRef(null);
  const traditionalRef = useRef(null);
  const thinRef = useRef(null);

  const sizeIndicatorRef = useRef(null);
  const indicatorRef = useRef(null);

  const sizeGroupRef = useRef(null);
  const sizeLabelRefs = useRef([]);

  const customId = `${item.id}_${selectedThickness}.join("-")}`;

  const cocktails = {
    id: customId,
    title: item.title,
    image: item.image,
    // price: selectedVariant.price,
    customizable: item.customizable,
  };

  const handleAddToCart = () => {
    addItemToCart(dispatch, cocktails, onClose);
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
    <ModalWrapper onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.select_half}>
          <h2 className={styles.title}>
            Выберите пиццы для левой и правой половинки
          </h2>

          <div className={styles.pizza_grid}>
            {pizzas.map((pizza) => (
              <div key={pizza.id} className={styles.pizza_card}>
                <Image
                  src={pizza.image}
                  alt={pizza.title}
                  width={140}
                  height={140}
                  className={styles.pizza_img}
                />
                <h3 className={styles.pizza_title}>{pizza.title}</h3>
                <div className={styles.pizza_price}>
                  {pizza.variants?.[0]?.price || pizza.price} тг.
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.conten__info_wrapper}>
          <div className={styles.content_info}>
            <PizzaSvg className={styles.pizza_svg} />
            <div>
              <div className={styles.pizza_label_wrapper}>
                <PizzaSvg className={styles.pizza_svg} />
                <div className={styles.pizza_label}>Выбери левую половинку</div>
              </div>
              <div>
                <PizzaSvg className={styles.pizza_svg} />
                <div className={styles.pizza_label}>
                  Выбери правую половинку
                </div>
              </div>
            </div>
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
            // selectedVariant={selectedVariant.price}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default PizzaHalfModal;
