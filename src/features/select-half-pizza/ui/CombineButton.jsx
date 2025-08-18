// components/CombineButton/CombineButton.jsx
import { useRef, useState } from "react";
import styles from "./CombineButton.module.scss";

const CombineButton = ({
  bothSelected,
  selectedSides,
  totalPrice,
  setShowInfo,
}) => {
  const [warning, setWarning] = useState("");
  const timeoutRef = useRef(null);

  const showWarning = (message) => {
    // сбросить прошлый таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // обновить текст сразу
    setWarning(message);

    // запустить новый таймер
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
    <div className={styles.wrapper}>
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
  );
};

export default CombineButton;
