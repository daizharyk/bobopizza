import { useState, useMemo, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import pizzaExtras from "@/data/pizzaExtras.json";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useRouter } from "next/navigation";

export const usePizzaSelection = (item, onClose) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const thicknessOptions = [
    { value: "Традиционное", key: "traditional" },
    { value: "Тонкое", key: "thin" },
  ];

  const [selectedSize, setSelectedSize] = useState(
    item.variants[1]?.size || ""
  );
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedThickness, setSelectedThickness] = useState(
    thicknessOptions[0]
  );

  const indicatorRef = useRef(null);
  const sizeIndicatorRef = useRef(null);
  const sizeGroupRef = useRef(null);
  const sizeLabelRefs = useRef([]);
  const traditionalRef = useRef(null);
  const thinRef = useRef(null);
  const groupRef = useRef(null);

  const selectedExtrasTitles = pizzaExtras
    .filter((extra) => selectedExtras.includes(extra.id))
    .map((extra) => extra.title)
    .join(", ");

  const toggleExtra = (id) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedVariant = item.variants?.find(
    (variant) => variant.size === selectedSize
  );

  const totalPrice = useMemo(() => {
    const totalExtrasPrice = pizzaExtras
      .filter((extra) => selectedExtras.includes(extra.id))
      .reduce((sum, extra) => sum + Number(extra.price), 0);

    return totalExtrasPrice + Number(selectedVariant?.price || 0);
  }, [selectedExtras, selectedVariant]);

  const customId = `${item.id}_${selectedVariant.size}_${
    selectedThickness.key
  }_${selectedExtras.sort().join("-")}`;

  const pizzaToAdd = {
    id: customId,
    title: item.title,
    image: item.image,
    size: selectedVariant.size,
    price: totalPrice,
    sizeUnit: selectedVariant.sizeUnit,
    thickness: selectedThickness,
    extras: selectedExtrasTitles,
    customizable: item.customizable,
  };

  const handleAddToCart = () => {
    addItemToCart(dispatch, pizzaToAdd, onClose);
    router.push("/");
  };

  useEffect(() => {
    const indicator = sizeIndicatorRef.current;
    const group = sizeGroupRef.current;
    if (!indicator || !group || !selectedSize) return;

    const updatePosition = () => {
      const index = item.variants.findIndex(
        (variant) => variant.size === selectedSize
      );
      const option = sizeLabelRefs.current[index];
      if (!option) return;

      const groupRect = group.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();
      const offsetLeft = optionRect.left - groupRect.left;

      indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    };

    const animationFrame = requestAnimationFrame(() => {
      setTimeout(updatePosition, 200);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [selectedSize, item.variants]);

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
    thicknessOptions,
    selectedSize,
    setSelectedSize,
    selectedExtras,
    toggleExtra,
    selectedThickness,
    setSelectedThickness,
    indicatorRef,
    sizeIndicatorRef,
    sizeGroupRef,
    sizeLabelRefs,
    traditionalRef,
    thinRef,
    groupRef,
    totalPrice,
    handleAddToCart,
    selectedVariant,
  };
};
