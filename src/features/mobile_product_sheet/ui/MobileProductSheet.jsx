"use client";
import { useEffect, useState } from "react";
import styles from "./MobileProductSheet.module.scss";

const MobileProductSheet = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    // блокируем скролл фона
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return <div className={styles.sheet}>{children}</div>;
};

export default MobileProductSheet;
