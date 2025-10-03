"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import data from "@/data/data.json";
import pizzaExtras from "@/data/pizzaExtras.json";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { Logger } from "sass";

const allItems = [...data.items];

export const useComboContent = (item, onClose) => {
  const [replaceItemIndex, setReplaceItemIndex] = useState(null);
  const [replaceItemType, setReplaceItemType] = useState(null);
  const [comboItems, setComboItems] = useState(item.items);
  const [showExtras, setShowExtras] = useState(false);
  const [selectedExtrasMap, setSelectedExtrasMap] = useState({});
  const [selectedOptionMap, setSelectedOptionMap] = useState({});
  const [lastActiveIndex, setLastActiveIndex] = useState(null);

  console.log("selectedExtrasMap", selectedExtrasMap);
  
  const indicatorRef = useRef(null);
  const groupRef = useRef(null);
  const refs = useRef({});

  const dispatch = useDispatch();

  // Заменить товар
  const replaceItem = (newItem) => {
    const updated = [...comboItems];
    updated[replaceItemIndex] = {
      ...updated[replaceItemIndex],
      defaultId: newItem.id,
    };
    setComboItems(updated);
  };

  // Выбор/отмена "экстры"
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

  // Уникальный id для корзины
  const customId = comboItems
    .map((it, index) => {
      const size = it.preferredSize || "";
      const option = selectedOptionMap[index]?.key || "";
      const isPizza = it.itemType === "pizza";
      const extras = isPizza
        ? (selectedExtrasMap[index] || []).sort().join("-")
        : "";
      return `${it.defaultId}_${size}_${option}_${extras}`;
    })
    .join("__");

  // Варианты
  const selectedVariants = comboItems.map((it) => {
    const product = allItems.find((p) => p.id === it.defaultId);
    if (!product) return null;
    return it.preferredSize && product.variants.length > 1
      ? product.variants.find((v) => v.size === it.preferredSize)
      : product.variants?.[0];
  });

  // Цена товаров
  const itemsPrice = selectedVariants
    .filter(Boolean)
    .reduce((total, v) => total + v.price, 0);

  // Цена экстрасов
  const selectedExtrasPrice = Object.values(selectedExtrasMap)
    .flat()
    .reduce((total, extraId) => {
      const extra = pizzaExtras.find((e) => e.id === extraId);
      return total + (extra ? Number(extra.price) : 0);
    }, 0);

  const totalPrice = itemsPrice + selectedExtrasPrice;
  const formattedPrice = totalPrice.toLocaleString("ru-RU");

  // Список для корзины
  const preparedComboItems = comboItems.map((it, index) => {
    const product = allItems.find((p) => p.id === it.defaultId);
    const preferredSize = it.preferredSize;
    const selectedVariant = product?.variants?.find(
      (variant) => variant.size === product.variants[0].size || preferredSize
    );

    return {
      title: product?.title || "Без названия",
      size: selectedVariant?.size || preferredSize || "",
      sizeUnit: selectedVariant?.sizeUnit || "",
      weight: selectedVariant?.weight || "",
      weightUnit: selectedVariant?.weightUnit || "",
      option: selectedOptionMap[index] || "",
      extras: (selectedExtrasMap[index] || []).map((extraId) => {
        const extra = pizzaExtras.find((e) => e.id === extraId);
        return extra?.title || "Экстра";
      }),
    };
  });

  const itemToAdd = {
    id: customId,
    title: item.title,
    image: item.image,
    price: totalPrice,
    comboItems: preparedComboItems,
  };

  const handleAddToCart = () => {
    addItemToCart(dispatch, itemToAdd, onClose);
  };



  useEffect(() => {
    const defaultMap = {};
    comboItems.forEach((it, index) => {
      if (it.type !== "pizza") return;
      const product = allItems.find((p) => p.id === it.defaultId);

      const optionGroups = product?.options || [];



      optionGroups.forEach((group) => {
        const defaultKey = group.default;
        const defaultChoice = group.choices.find((c) => c.key === defaultKey);
        if (defaultChoice) {
          defaultMap[index] = {
            key: defaultChoice.key,
            label: defaultChoice.label,
          };
        }
      });
    });

    setSelectedOptionMap(defaultMap);
  }, [comboItems]);

  return {
    replaceItemIndex,
    setReplaceItemIndex,
    replaceItemType,
    replaceItem,
    setReplaceItemType,
    comboItems,
    setComboItems,
    showExtras,
    setShowExtras,
    selectedExtrasMap,
    setSelectedExtrasMap,
    toggleExtra,
    selectedOptionMap,
    setSelectedOptionMap,
    lastActiveIndex,
    setLastActiveIndex,
    indicatorRef,
    groupRef,
    refs,
    formattedPrice,
    totalPrice,
    itemsPrice,
    itemToAdd,
    handleAddToCart,
  };
};
