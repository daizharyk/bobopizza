import { useEffect } from "react";

export function useDisablePullToRefresh(ref, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleTouchMove = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [ref, active]);
}
