import { createPortal } from "react-dom";
import styles from "./PizzaModal.module.scss";
import { useEffect, useState } from "react";

const PizzaModal = ({ item, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Добавим небольшой таймер, чтобы включить анимацию после монтирования
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10); // минимальная задержка
    return () => clearTimeout(timer);
  }, []);

  const modalContent = (
    <>
      <div className={styles.overlay} onClick={onClose}>
        {" "}
      </div>
      <div className={`${styles.container} ${visible ? styles.show : ""}`}>
        Модалка с анимацией появления ✨
      </div>
    </>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default PizzaModal;
