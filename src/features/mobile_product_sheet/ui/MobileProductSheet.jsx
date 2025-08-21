"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MobileProductSheet.module.scss";

const MobileProductSheet = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ждем, пока DOM доступен

    const timer = setTimeout(() => setVisible(true), 10);

    // блокируем скролл фона
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow; // восстанавливаем скролл
    };
  }, []);

  if (!mounted) return null; // пока DOM не готов — ничего не рендерим

  return createPortal(
    <div className={`${styles.sheet} ${visible ? styles.show : ""}`}>
      {children}
    </div>,
    document.body
  );
};

export default MobileProductSheet;
