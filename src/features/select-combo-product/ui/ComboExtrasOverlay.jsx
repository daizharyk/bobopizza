"use client";
import PizzaExtrasSelector from "@/features/PizzaExtrasSelector/PizzaExtrasSelector";
import styles from "./ComboExtrasOverlay.module.scss";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";

const ComboExtrasOverlay = ({
  setShowExtras,
  pizzaExtras,
  selectedExtras,
  setSelectedExtrasMap,
  selectedExtrasMap,
  replaceItemIndex,
  toggleExtra,
}) => {
  return (
    <div className={styles.extras_overlay}>
      <div className={styles.extras_header}>
        <button
          onClick={() => setShowExtras(false)}
          className={styles.back_button}
        >
          <ArrowLeft className={styles.back_icon} />
        </button>
        <h2>Меняйте на свой вкус</h2>
      </div>
      <div className={styles.extras_content_scrollable}>
        <PizzaExtrasSelector
          pizzaExtras={pizzaExtras}
          selectedExtras={selectedExtrasMap[replaceItemIndex] || []}
          toggleExtra={(id) => toggleExtra(replaceItemIndex, id)}
          variant="combo"
        />
      </div>

      <div className={styles.extras_buttons}>
        <button
          className={styles.save_button}
          onClick={() => setShowExtras(false)}
        >
          Сохранить
        </button>
        <button
          className={styles.reset_button}
          onClick={() =>
            setSelectedExtrasMap((prev) => ({
              ...prev,
              [replaceItemIndex]: [],
            }))
          }
        >
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default ComboExtrasOverlay;
