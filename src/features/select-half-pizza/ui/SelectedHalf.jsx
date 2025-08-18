import Image from "next/image";

import styles from "./SelectedHalf.module.scss";
import CombineButton from "./CombineButton";

const SelectedHalf = ({
  pizzas,
  selectedSides,
  handlePizzaClick,
  refs,
  bothSelected,
  setShowInfo,
  totalPrice,
  isMobile,
  left,
  right,
}) => {
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
          >
            <div
              onClick={() => handlePizzaClick(pizza)}
              className={`${styles.pizza_img_wrapper} ${
                selectedSides.left?.id === pizza.id ||
                selectedSides.right?.id === pizza.id
                  ? styles["selected"]
                  : ""
              }`}
            >
              <Image
                src={pizza.image}
                alt={pizza.title}
                width={138}
                height={138}
                className={`${styles.pizza_img} ${
                  selectedSides.left?.id === pizza.id
                    ? styles["left-selected"]
                    : selectedSides.right?.id === pizza.id
                    ? styles["right-selected"]
                    : ""
                }`}
                style={{ objectFit: "contain" }}
              />
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
          {(selectedSides?.left || selectedSides?.right) && (
            <div className={styles.selected_pizzas}>
              <div className={styles.side_wrapper}>
                <div className={styles.left_side}>
                  {selectedSides.left === null
                    ? "Левая половина"
                    : selectedSides.left?.title}
                </div>
                <div className={styles.price}>{left}</div>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.side_wrapper}>
                <div className={styles.right_side}>
                  {selectedSides.right === null
                    ? "Правая половина"
                    : selectedSides.right?.title}
                </div>
                <div className={styles.price}>{right}</div>
              </div>
            </div>
          )}

          <CombineButton
            bothSelected={bothSelected}
            selectedSides={selectedSides}
            totalPrice={totalPrice}
            setShowInfo={setShowInfo}
          />
        </div>
      )}
    </div>
  );
};

export default SelectedHalf;
