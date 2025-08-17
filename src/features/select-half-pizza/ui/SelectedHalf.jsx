import Image from "next/image";

import styles from "./SelectedHalf.module.scss";

const SelectedHalf = ({ pizzas, selectedSides, handlePizzaClick, refs }) => {
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
  );
};

export default SelectedHalf;
