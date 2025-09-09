// hooks/useScrollRestoration.js
import { useEffect } from "react";

export function useScrollRestoration() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const savedScroll = sessionStorage.getItem("scrollPosition");
      if (savedScroll) {
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedScroll, 10));
          sessionStorage.removeItem("scrollPosition");
        });
      }
    };

    window.addEventListener("popstate", handlePopState);

    handlePopState();

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const saveScroll = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    }
  };

  return saveScroll;
}
