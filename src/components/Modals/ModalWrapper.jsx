// components/ModalWrapper.jsx
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import styles from "./ModalWrapper.module.scss";

const ModalWrapper = ({ children, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);
  
  const modalContent = (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose} />
      <div
        className={`${styles.container} ${visible ? styles.show : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default ModalWrapper;
