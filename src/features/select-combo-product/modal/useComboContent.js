
"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import data from "@/data/data.json";
import pizzaExtras from "@/data/pizzaExtras.json";
import { addItemToCart } from "@/components/utils/addItemToCart";

const allItems = [...data.items];

export const useComboContent = (item, onClose) => {
  const [replaceItemIndex, setReplaceItemIndex] = useState(null);
  const [replaceItemType, setReplaceItemType] = useState(null);
  const [comboItems, setComboItems] = useState(item.items);
  const [showExtras, setShowExtras] = useState(false);
  const [selectedExtrasMap, setSelectedExtrasMap] = useState({});
  const [selectedOptionMap, setSelectedOptionMap] = useState({});

  const indicatorRef = useRef(null);
  const groupRef = useRef(null);
  const refs = useRef({});

  const dispatch = useDispatch();

  const replaceItem = (newItem) => {
    const updated = [...comboItems];
    updated[replaceItemIndex] = {
      ...updated[replaceItemIndex],
      defaultId: newItem.id,
    };
    setComboItems(updated);
  };

  const toggleExtra = (index, extraId) => {
    setSelectedExtrasMap((prev) => {
      const prevExtras = prev[index] || [];
      const isSelected = prevExtras.includes(extraId);
      const updatedExtras = isSelected
        ? prevExtras.filter((id) => id !== extraId)
        : [...prevExtras, extraId];

      return { ...prev, [index]: updatedExtras };
    });
  };

  const selectedVariants = comboItems.map((item) => {
    const product = allItems.find((p) => p.id === item.defaultId);
    return item.preferredSize && product?.variants.length > 1
      ? product.variants.find((v) => v.size === item.preferredSize)
      : product.variants?.[0];
  });

  const itemsPrice = selectedVariants
    .filter(Boolean)
    .reduce((total, v) => total + v.price, 0);

  const selectedExtrasPrice = Object.values(selectedExtrasMap)
    .flat()
    .reduce((total, id) => {
      const extra = pizzaExtras.find((e) => e.id === id);
      return total + (extra ? Number(extra.price) : 0);
    }, 0);

  const totalPrice = itemsPrice + selectedExtrasPrice;
  const formattedPrice = totalPrice.toLocaleString("ru-RU");

  const itemToAdd = {
    id: comboItems
      .map((i, idx) => {
        const extras = (selectedExtrasMap[idx] || []).sort().join("-");
        return `${i.defaultId}_${i.preferredSize || ""}_${
          selectedOptionMap[idx]?.key || ""
        }_${extras}`;
      })
      .join("__"),
    title: item.title,
    image: item.image,
    price: totalPrice,
    comboItems: comboItems.map((i, idx) => {
      const product = allItems.find((p) => p.id === i.defaultId);
      const variant =
        product?.variants?.find((v) => v.size === i.preferredSize) ||
        product?.variants?.[0];
      return {
        title: product?.title || "Без названия",
        size: variant?.size || "",
        sizeUnit: variant?.sizeUnit || "",
        weight: variant?.weight || "",
        weightUnit: variant?.weightUnit || "",
        option: selectedOptionMap[idx] || "",
        extras: (selectedExtrasMap[idx] || []).map(
          (eId) => pizzaExtras.find((e) => e.id === eId)?.title || "Экстра"
        ),
      };
    }),
  };

  const handleAddToCart = () => addItemToCart(dispatch, itemToAdd, onClose);

  useEffect(() => {
    const currentOption = selectedOptionMap[replaceItemIndex];
    const optionRef = refs.current[currentOption?.key || ""];
    const indicator = indicatorRef.current;
    const group = groupRef.current;
    if (!optionRef || !indicator || !group) return;
    const offsetLeft =
      optionRef.getBoundingClientRect().left -
      group.getBoundingClientRect().left;
    indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
  }, [selectedOptionMap]);

  useEffect(() => {
    const defaultMap = {};
    comboItems.forEach((i, idx) => {
      if (i.type !== "pizzas") return;
      const product = allItems.find((p) => p.id === i.defaultId);
      product?.options?.forEach((group) => {
        const defaultChoice = group.choices.find(
          (c) => c.key === group.default
        );
        if (defaultChoice)
          defaultMap[idx] = {
            key: defaultChoice.key,
            label: defaultChoice.label,
          };
      });
    });
    setSelectedOptionMap(defaultMap);
  }, [comboItems]);

  return {
    replaceItemIndex,
    setReplaceItemIndex,
    replaceItemType,
    setReplaceItemType,
    comboItems,
    showExtras,
    setShowExtras,
    selectedExtrasMap,
    toggleExtra,
    selectedOptionMap,
    setSelectedOptionMap,
    replaceItem,
    handleAddToCart,
    totalPrice,
    formattedPrice,
    indicatorRef,
    groupRef,
    refs,
    allItems,
  };
};
