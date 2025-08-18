import Image from "next/image";

import styles from "./SelectedHalf.module.scss";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";

const SelectedHalf = ({
  pizzas,
  selectedSides,
  handlePizzaClick,
  refs,
  bothSelected,
  setShowInfo,
  totalPrice,
}) => {
  console.log("selectedSides", selectedSides);

  const isMobile = useIsMobile();
  return (
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
              className={
                selectedSides.left?.id === pizza.id ||
                selectedSides.right?.id === pizza.id
                  ? styles["selected"]
                  : ""
              }
            >
              <div
                className={`${styles.pizza_img_wrapper} ${
                  selectedSides.left?.id === pizza.id
                    ? styles["left-selected"]
                    : selectedSides.right?.id === pizza.id
                    ? styles["right-selected"]
                    : ""
                }`}
              >
                <Image
                  src={pizza.image}
                  alt={pizza.title}
                  width={138}
                  height={138}
                  className={styles.pizza_img}
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
      {isMobile && (
        <div className={styles.combine_wrapper}>
          <div className={styles.selected_pizzas}>
            <div className={styles.side_wrapper}>
              <div className={styles.left_side}>
                {selectedSides.left?.title}
              </div>
              <div className={styles.price}></div>
            </div>
            <div className={styles.side_wrapper}>
              <div className={styles.right_side}>
                {selectedSides.right?.title}
              </div>
              <div className={styles.price}>{selectedSides.right?.price}</div>
            </div>
          </div>
          <button
            className={`${styles.combineBtn} ${
              !bothSelected ? styles.disabled : ""
            }`}
            disabled={!bothSelected}
            onClick={() => setShowInfo(true)}
          >
            {bothSelected
              ? `Объединить половинку за ${totalPrice} ₸`
              : "Выберите вторую половинку"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectedHalf;
