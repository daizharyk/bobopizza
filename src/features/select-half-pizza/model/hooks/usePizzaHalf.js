import { useEffect, useMemo, useState, useRef } from "react";

import { calculatePrice } from "../../services/calculatePrice";
import { buildHalfPizza } from "../../services/buildHalfPizza";
import thicknessOptions from "../../config/thicknessOptions";

export function usePizzaHalf(item, onClose, addItemToCart, dispatch) {
  const [selectedThickness, setSelectedThickness] = useState(
    thicknessOptions[0]
  );
  const [showWarning, setShowWarning] = useState(false);
  const [selectedSides, setSelectedSides] = useState({
    left: null,
    right: null,
  });

  const groupRef = useRef(null);
  const traditionalRef = useRef(null);
  const thinRef = useRef(null);
  const indicatorRef = useRef(null);
  const refs = useRef([]);
  const totalPrice = useMemo(
    () => calculatePrice(selectedSides),
    [selectedSides]
  );

  const halfPizza = useMemo(
    () => buildHalfPizza(item, selectedSides, selectedThickness, totalPrice),
    [item, selectedSides, selectedThickness, totalPrice]
  );

  const handleAddToCart = () => {
    if (!selectedSides.left || !selectedSides.right) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return;
    }
    addItemToCart(dispatch, halfPizza, onClose);
  };

  const handlePizzaClick = (pizza) => {
    setSelectedSides((prev) => {
      if (prev.left?.id === pizza.id) return { ...prev, left: null };
      if (prev.right?.id === pizza.id) return { ...prev, right: null };
      if (prev.left && prev.right) return { left: pizza, right: null };
      if (!prev.left) return { ...prev, left: pizza };
      if (!prev.right) return { ...prev, right: pizza };
      return prev;
    });
  };

  useEffect(() => {
    const currentRef =
      selectedThickness.key === "traditional" ? traditionalRef : thinRef;
    const indicator = indicatorRef.current;
    const group = groupRef.current;

    if (currentRef.current && indicator && group) {
      const option = currentRef.current;
      const groupRect = group.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();
      const offsetLeft = optionRect.left - groupRect.left;
      indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    }
  }, [selectedThickness]);

  return {
    selectedThickness,
    setSelectedThickness,
    showWarning,
    selectedSides,
    setSelectedSides,
    handleAddToCart,
    handlePizzaClick,
    groupRef,
    traditionalRef,
    thinRef,
    indicatorRef,
    halfPizza,
    totalPrice,
    refs,
    thicknessOptions,
  };
}
