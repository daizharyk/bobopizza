"use client";
import Image from "next/image";
import styles from "./ComboContent.module.scss";
import data from "@/data/data.json";
import pizzaExtras from "@/data/pizzaExtras.json";
import AddToCartButton from "../../../shared/ui/AddToCartButton/AddToCartButton";
import { useEffect, useRef, useState } from "react";
import PizzaExtrasSelector from "@/features/PizzaExtrasSelector/PizzaExtrasSelector";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useDispatch } from "react-redux";

const allItems = [...data.items];

const ComboModal = ({ item, onClose }) => {
  const [replaceItemIndex, setReplaceItemIndex] = useState(null);
  const [replaceItemType, setReplaceItemType] = useState(null);
  const [comboItems, setComboItems] = useState(item.items);
  const [showExtras, setShowExtras] = useState(false);
  const [selectedExtrasMap, setSelectedExtrasMap] = useState({});
  const [selectedOptionMap, setSelectedOptionMap] = useState({});
  const [lastActiveIndex, setLastActiveIndex] = useState(null);

  const indicatorRef = useRef(null);
  const groupRef = useRef(null);
  const refs = useRef({});

  const dispatch = useDispatch();

  const replaceItem = (item) => {
    const updated = [...comboItems];
    updated[replaceItemIndex] = {
      ...updated[replaceItemIndex],
      defaultId: item.id,
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

      return {
        ...prev,
        [index]: updatedExtras,
      };
    });
  };

  const customId = comboItems
    .map((item, index) => {
      const size = item.preferredSize || "";
      const option = selectedOptionMap[index]?.key || "";

      // Добавляем extras только если тип товара — пицца
      const isPizza = item.itemType === "pizza";
      const extras = isPizza
        ? (selectedExtrasMap[index] || []).sort().join("-")
        : "";

      return `${item.defaultId}_${size}_${option}_${extras}`;
    })
    .join("__");

  const selectedVariants = comboItems.map((item) => {
    const product = allItems.find((p) => p.id === item.defaultId);

    const selectedVariant =
      item.preferredSize && product.variants.length > 1
        ? product.variants.find(
            (variant) => variant.size === item.preferredSize
          )
        : product.variants?.[0];

    return selectedVariant;
  });

  const itemsPrice = selectedVariants
    .filter(Boolean)
    .reduce((total, variant) => total + variant.price, 0);

  const selectedExtrasPrice = Object.values(selectedExtrasMap)
    .flat()
    .reduce((total, extraId) => {
      const extra = pizzaExtras.find((e) => e.id === extraId);
      return total + (extra ? Number(extra.price) : 0);
    }, 0);

  const totalPrice = itemsPrice + selectedExtrasPrice;
  const formattedPrice = totalPrice.toLocaleString("ru-RU");

  const preparedComboItems = comboItems.map((item, index) => {
    const product = allItems.find((p) => p.id === item.defaultId);
    const preferredSize = item.preferredSize;

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
    const currentOption = selectedOptionMap[replaceItemIndex];

    const currentRef = refs.current[currentOption?.key || ""];
    const indicator = indicatorRef.current;
    const group = groupRef.current;

    if (!currentRef || !indicator || !group) return;

    const option = currentRef;
    const groupRect = group.getBoundingClientRect();
    const optionRect = option.getBoundingClientRect();

    const offsetLeft = optionRect.left - groupRect.left;
    indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
  }, [selectedOptionMap]);

  useEffect(() => {
    const defaultMap = {};

    comboItems.forEach((item, index) => {
      if (item.type !== "pizzas") return;

      const product = allItems.find((p) => p.id === item.defaultId);

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
  }, [comboItems, allItems]);

  return (
    <section className={styles.container}>
      <article className={styles.image_combo}>
        {replaceItemIndex !== null ? (
          <div className={styles.pizza_list}>
            {allItems
              .filter((item) => item.type === replaceItemType)
              .map((item) => {
                const isSelected =
                  item.id === comboItems[replaceItemIndex].defaultId;

                return (
                  <div
                    onClick={() => {
                      replaceItem(item);
                    }}
                    key={item.id}
                    className={`${styles.pizza_option} ${
                      isSelected ? styles.pissa_active : ""
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={156}
                      height={156}
                    />
                    <p>{item.title}</p>
                  </div>
                );
              })}
          </div>
        ) : (
          <Image alt={item.title} src={item.image} width={535} height={535} />
        )}
        {showExtras && (
          <div className={styles.extras_overlay}>
            <div className={styles.extras_header}>
              <button
                onClick={() => setShowExtras(false)}
                className={styles.back_button}
              >
                <ArrowLeft className={styles.back_icon} />
              </button>
              <h2>Меняйте на свой вкус</h2>
            </div>
            <div className={styles.extras_content_scrollable}>
              <PizzaExtrasSelector
                pizzaExtras={pizzaExtras}
                selectedExtras={selectedExtrasMap[replaceItemIndex] || []}
                toggleExtra={(id) => toggleExtra(replaceItemIndex, id)}
                variant="combo"
              />
            </div>

            <div className={styles.extras_buttons}>
              <button
                className={styles.save_button}
                onClick={() => setShowExtras(false)}
              >
                Сохранить
              </button>
              <button
                className={styles.reset_button}
                onClick={() =>
                  setSelectedExtrasMap((prev) => ({
                    ...prev,
                    [replaceItemIndex]: [],
                  }))
                }
              >
                Сбросить
              </button>
            </div>
          </div>
        )}
      </article>
      <div className={styles.wrapper}>
        <article className={styles.info_wrapper}>
          <div className={styles.info}>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.description}>{item.description}</p>
          </div>
          {comboItems.map((item, index) => {
            const product = allItems.find((p) => p.id === item.defaultId);

            let selectedVariant;

            if (item.preferredSize && product?.variants?.length > 1) {
              selectedVariant = product.variants.find(
                (variant) => variant.size === item.preferredSize
              );
            } else {
              selectedVariant = product?.variants?.[0];
            }

            const selectedExtrasTitles = (selectedExtrasMap[index] || [])
              .map((id) => pizzaExtras.find((e) => e.id === id)?.title)
              .filter(Boolean);

            return (
              <article
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (showExtras && replaceItemIndex !== index) return;

                  if (replaceItemIndex === index) {
                    setReplaceItemIndex(null);
                    setReplaceItemType(null);
                    setShowExtras(false);
                  } else {
                    setReplaceItemIndex(index);
                    setReplaceItemType(item.type);
                    setShowExtras(false);
                  }
                }}
                className={`${styles.item_card} ${
                  replaceItemIndex === index ? styles.item_card_active : ""
                } ${
                  showExtras && replaceItemIndex !== index
                    ? styles.disabled
                    : ""
                }`}
              >
                <div className={styles.top_wrapper}>
                  <div className={styles.image}>
                    <Image
                      alt={product.title}
                      src={product.image}
                      width={68}
                      height={68}
                    />
                  </div>
                  <div className={styles.item_info}>
                    <div className={styles.info}>
                      <h3 className={styles.title}>{product.title}</h3>
                      <div className={styles.size}>
                        {selectedVariant.size} {selectedVariant.sizeUnit} ,{" "}
                        {selectedOptionMap[index]?.label &&
                          ` ${selectedOptionMap[index].label} `}
                        {selectedVariant.weight &&
                          ` ${selectedVariant.weight}
                              ${selectedVariant.weightUnit}`}
                      </div>
                      <p className={styles.ingredients}>
                        {product.ingredients}{" "}
                        {selectedExtrasTitles.length > 0 && (
                          <span className={styles.extraList}>
                            {" + "}
                            {selectedExtrasTitles.join(", + ")}
                          </span>
                        )}
                      </p>
                      {selectedExtrasMap[index]?.length > 0 &&
                        (() => {
                          const extras = selectedExtrasMap[index];

                          const price = extras.reduce((sum, extraId) => {
                            const extra = pizzaExtras.find(
                              (e) => e.id === extraId
                            );
                            return sum + (extra ? Number(extra.price) : 0);
                          }, 0);

                          return (
                            <div className={styles.extra_price}>
                              +{price.toLocaleString("ru-RU")} тг
                            </div>
                          );
                        })()}
                    </div>
                    <div
                      className={`${styles.botton_wrapper} ${
                        replaceItemIndex === index ? styles.column : ""
                      }`}
                    >
                      {replaceItemIndex !== index && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (replaceItemIndex === index) {
                              setReplaceItemIndex(null);
                              setReplaceItemType(null);
                            } else {
                              setReplaceItemIndex(index);
                              setReplaceItemType(item.type);
                            }
                          }}
                          className={styles.replace}
                        >
                          Заменить
                        </button>
                      )}
                      {product.type === "pizzas" && !showExtras && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setReplaceItemIndex(index);
                            setLastActiveIndex(index);
                            setShowExtras(true);
                          }}
                          className={styles.change}
                        >
                          Изменить состав
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {replaceItemIndex === index &&
                  product.options &&
                  !["drinks", "coctayls", "coffee"].includes(product.type) && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      ref={groupRef}
                      className={styles.thicknessGroup}
                    >
                      <div ref={indicatorRef} className={styles.selected}></div>
                      {product.options?.map((optionGroup, groupIndex) => {
                        return (
                          <div key={groupIndex} className={styles.optionGroup}>
                            {optionGroup.choices.map((choice) => {
                              const isChecked =
                                selectedOptionMap[optionGroup.type]?.key ===
                                choice.key;

                              return (
                                <div
                                  className={styles.wrapper_option}
                                  key={choice.key}
                                >
                                  <input
                                    type="radio"
                                    id={`${optionGroup.type}_${choice.key}_${item.defaultId}`}
                                    name={`${optionGroup.type}_${item.defaultId}`}
                                    value={choice.key}
                                    className={styles.hiddenInput}
                                    checked={isChecked}
                                    onChange={() => {
                                      const updatedMap = {
                                        ...selectedOptionMap,
                                        [replaceItemIndex]: {
                                          key: choice.key,
                                          label: choice.label,
                                        },
                                      };

                                      setSelectedOptionMap(updatedMap);
                                    }}
                                  />
                                  <label
                                    htmlFor={`${optionGroup.type}_${choice.key}_${item.defaultId}`}
                                    className={styles.thicknessOption}
                                    ref={(el) => {
                                      if (el) {
                                        refs.current[choice.key] = el;
                                      }
                                    }}
                                  >
                                    {choice.label}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  )}
              </article>
            );
          })}
        </article>
        <div className={styles.price_wrapper}>
          {Object.values(selectedExtrasMap).some((arr) => arr.length > 0) && (
            <div className={styles.extra_price}>
              <div className={styles.price_combo}>
                Комбо <span>{itemsPrice.toLocaleString("ru-RU")} тг.</span>
              </div>
              {Object.entries(selectedExtrasMap).map(([index, extras]) => {
                const comboItem = comboItems[index];
                const product = allItems.find(
                  (p) => p.id === comboItem?.defaultId
                );
                const title = product?.title;

                const price = extras.reduce((sum, id) => {
                  const extra = pizzaExtras.find((e) => e.id === id);
                  return sum + (extra ? Number(extra.price) : 0);
                }, 0);

                if (!price) return null;

                return (
                  <div key={index} className={styles.price_extra}>
                    {title} <span>+{price.toLocaleString("ru-RU")} тг.</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className={styles.total_price}>
            {" "}
            <div className={styles.price}>{formattedPrice} тг.</div>
            <AddToCartButton
              disabled={showExtras}
              onAddToCart={handleAddToCart}
              className={styles.button}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboModal;
