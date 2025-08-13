"use client";
import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 450) => {
  const [isMobile, setIsMobile] = useState(null);


  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    // Установить начальное значение
    handleChange(mediaQuery);

    // Подписка на изменение ширины экрана
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobile;
};
