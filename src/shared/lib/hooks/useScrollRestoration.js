// hooks/useScrollRestoration.js
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollRestoration() {
  const pathname = usePathname(); // фикс: вызываем один раз

  useEffect(() => {
    if (typeof window === "undefined") return;

    // при загрузке страницы восстанавливаем сохранённую позицию
    const savedScroll = sessionStorage.getItem("scrollPosition");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
      sessionStorage.removeItem("scrollPosition"); // убираем, чтобы не сработало повторно
    }
  }, [pathname]); // срабатывает при каждом изменении маршрута

  // функция для сохранения позиции
  const saveScroll = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    }
  };

  return saveScroll;
}
