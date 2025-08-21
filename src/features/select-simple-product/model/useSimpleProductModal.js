// features/simple-product/model/useSimpleProductModal.js
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/components/utils/addItemToCart";

export const useSimpleProductModal = (item, onClose) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(item.variants?.[0]?.size || "");
  const sizeGroupRef = useRef(null);
  const sizeLabelRefs = useRef([]);
  const sizeIndicatorRef = useRef(null);

  const selectedVariant = item.variants?.find((v) => v.size === selectedSize);
  const customId = `${item.id}_${selectedSize}`;

  const preparedItem = {
    id: customId,
    title: item.title,
    image: item.image,
    size: selectedSize,
    sizeUnit: selectedVariant?.sizeUnit,
    price: selectedVariant?.price,
    customizable: item.customizable,
    type: item.type,
  };

  const handleAddToCart = () => {
    addItemToCart(dispatch, preparedItem, onClose);
  };

  // Логика для позиционирования индикатора выбранного размера
  useEffect(() => {
    const indicator = sizeIndicatorRef.current;
    const group = sizeGroupRef.current;
    if (!indicator || !group || !selectedSize) return;

    const updatePosition = () => {
      const index = item.variants.findIndex((v) => v.size === selectedSize);
      const option = sizeLabelRefs.current[index];
      if (!option) return;
      const groupRect = group.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();
      const offsetLeft = optionRect.left - groupRect.left;
      indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    };

    const frame = requestAnimationFrame(() => setTimeout(updatePosition));
    return () => cancelAnimationFrame(frame);
  }, [selectedSize, item.variants]);

  return {
    selectedSize,
    setSelectedSize,
    selectedVariant,
    sizeGroupRef,
    sizeLabelRefs,
    sizeIndicatorRef,
    handleAddToCart,
  };
};
