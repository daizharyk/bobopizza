import { useState, useRef } from "react";

export function useBottomSheet({ onClose, isActive, isMobile }) {
  const panelRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const dragStartYRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTRef = useRef(0);
  const velocityRef = useRef(0);

  const CLOSE_DISTANCE = 120; // px
  const CLOSE_VELOCITY = 0.6; // px/ms

  const handleTouchStart = (e) => {
    if (!isMobile || !isActive) return;

    const panel = panelRef.current;
    if (!panel) return;

    // начинаем drag только если скролл сверху
    if (panel.scrollTop <= 0) {
      const y = e.touches[0].clientY;
      dragStartYRef.current = y;
      lastYRef.current = y;
      lastTRef.current = performance.now();
      velocityRef.current = 0;
      setDragging(true);
      setDragOffset(0);
    }
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;
    const y = e.touches[0].clientY;
    const dy = Math.max(0, y - dragStartYRef.current); // только вниз
    setDragOffset(dy);

    const now = performance.now();
    const dt = now - lastTRef.current;
    if (dt > 0) {
      velocityRef.current = (y - lastYRef.current) / dt;
      lastYRef.current = y;
      lastTRef.current = now;
    }
  };

  const handleTouchEnd = () => {
    if (!dragging) return;

    const shouldClose =
      dragOffset > CLOSE_DISTANCE || velocityRef.current > CLOSE_VELOCITY;

    setDragging(false);

    if (shouldClose) {
      onClose?.();
      setDragOffset(0);
    } else {
      setDragOffset(0);
    }
  };

  return {
    panelRef,
    dragging,
    dragOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
