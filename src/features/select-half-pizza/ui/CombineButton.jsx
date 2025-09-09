// components/CombineButton/CombineButton.jsx
import { useRef, useState } from "react";
import styles from "./CombineButton.module.scss";

const CombineButton = ({
  bothSelected,
  selectedSides,
  totalPrice,
  setShowInfo,
  className,
  left,
  right,
}) => {
  const [warning, setWarning] = useState("");
  const timeoutRef = useRef(null);


  const showWarning = (message) => {
    // сбросить прошлый таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setWarning(message);

    timeoutRef.current = setTimeout(() => {
      setWarning("");
      timeoutRef.current = null;
    }, 2000);
  };
  const handleClick = () => {
    if (!selectedSides.left && !selectedSides.right) {
      showWarning("Вы еще не выбрали ни одной половинки");
    } else if (!bothSelected) {
      showWarning("Выберите вторую половинку");
    } else {
      setShowInfo(true);
      return;
    }
  };

  return (
    <>
      {(selectedSides?.left || selectedSides?.right) && (
        <div className={styles.selected_pizzas}>
          <div className={styles.side_wrapper}>
            <div className={styles.left_side}>
              {selectedSides.left === null
                ? "Левая половина"
                : selectedSides.left?.title}
            </div>
            <div className={styles.price}> {left ? `+ ${left} тг.` : ""}</div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.side_wrapper}>
            <div className={styles.right_side}>
              {selectedSides.right === null
                ? "Правая половина"
                : selectedSides.right?.title}
            </div>
            <div className={styles.price}>{right ? `+ ${right} тг.` : ""}</div>
          </div>
        </div>
      )}
      <div className={`${styles.wrapper} ${className || ""}`}>
        <button
          className={`${styles.combineBtn} ${
            !bothSelected ? styles.disabled : ""
          }`}
          onClick={handleClick}
        >
          {bothSelected
            ? `Объединить половинку за ${totalPrice} ₸`
            : "Объединить половинки"}
        </button>
        {warning && <div className={styles.warning}>{warning}</div>}
      </div>
    </>
  );
};

export default CombineButton;
