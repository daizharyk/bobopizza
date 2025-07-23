import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import styles from "./ComboModal.module.scss";
import data from "@/data/data.json";
import pizzaExtras from "@/data/pizzaExtras.json";
import AddToCartButton from "../AddToCartButton";
import { useEffect, useRef, useState } from "react";
import PizzaExtrasSelector from "@/components/PizzaExtrasSelector/PizzaExtrasSelector";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useDispatch } from "react-redux";

const allItems = [...data.items];
const thicknessOptions = [
  { value: "Традиционное", key: "traditional" },
  { value: "Тонкое", key: "thin" },
];

const ComboModal = ({ item, onClose }) => {
  const [replaceItemIndex, setReplaceItemIndex] = useState(null);
  const [comboItems, setComboItems] = useState(item.items);
  const [showExtras, setShowExtras] = useState(false);
  const [selectedExtrasMap, setSelectedExtrasMap] = useState({});
  const [selectedThicknessMap, setSelectedThicknessMap] = useState({});
  const [lastActiveIndex, setLastActiveIndex] = useState(null);

  const indicatorRef = useRef(null);
  const traditionalRef = useRef(null);
  const thinRef = useRef(null);
  const groupRef = useRef(null);

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

  console.log("item", item);

  const customId = comboItems
    .map((item, index) => {
      const size = item.preferredSize;
      const thickness = selectedThicknessMap[index]?.key || "none";
      const extras = (selectedExtrasMap[index] || []).sort().join("-");
      return `${item.defaultId}_${size}_${thickness}_${extras}`;
    })
    .join("__");

  const selectedVariants = comboItems.map((item) => {
    const product = allItems.find((p) => p.id === item.defaultId);
    const preferredSize = item.preferredSize;

    const selectedVariant = product.variants?.find(
      (variant) => variant.size === preferredSize
    );

    return selectedVariant;
  });

  const pizzaPrice = selectedVariants
    .filter(Boolean)
    .reduce((total, variant) => total + variant.price, 0);

  const selectedExtrasPrice = Object.values(selectedExtrasMap)
    .flat()
    .reduce((total, extraId) => {
      const extra = pizzaExtras.find((e) => e.id === extraId);
      return total + (extra ? Number(extra.price) : 0);
    }, 0);

  const totalPrice = pizzaPrice + selectedExtrasPrice;
  const formattedPrice = totalPrice.toLocaleString("ru-RU");

  const preparedComboItems = comboItems.map((item, index) => {
    const product = allItems.find((p) => p.id === item.defaultId);
    const preferredSize = item.preferredSize;

    const selectedVariant = product?.variants?.find(
      (variant) => variant.size === preferredSize
    );

    return {
      title: product?.title || "Без названия",

      size: selectedVariant?.size || preferredSize || "",

      sizeUnit: selectedVariant?.sizeUnit || "",

      weight: selectedVariant?.weight || "",

      weightUnit: selectedVariant?.weightUnit || "",

      thickness: selectedThicknessMap[index] || "",

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
    if (replaceItemIndex !== null && !selectedThicknessMap[replaceItemIndex]) {
      setSelectedThicknessMap((prev) => ({
        ...prev,
        [replaceItemIndex]: thicknessOptions[0],
      }));
    }
  }, [replaceItemIndex]);

  useEffect(() => {
    const currentThickness = selectedThicknessMap[replaceItemIndex];
    const currentRef =
      currentThickness?.key === "traditional" ? traditionalRef : thinRef;
    const indicator = indicatorRef.current;
    const group = groupRef.current;

    if (currentRef.current && indicator && group) {
      const option = currentRef.current;
      const groupRect = group.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();

      const offsetLeft = optionRect.left - groupRect.left;

      indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    }
  }, [replaceItemIndex, selectedThicknessMap]);

  useEffect(() => {
    const defaultThickness = {};
    comboItems.forEach((_, index) => {
      defaultThickness[index] = thicknessOptions[0]; // традиционное
    });
    setSelectedThicknessMap(defaultThickness);
  }, [comboItems]);

  return (
    <ModalWrapper onClose={onClose}>
      <section className={styles.container}>
        <article className={styles.image_combo}>
          {replaceItemIndex !== null ? (
            <div className={styles.pizza_list}>
              {allItems
                .filter((item) => item.type === "pizzas")
                .map((pizza) => {
                  const isSelected =
                    pizza.id === comboItems[replaceItemIndex].defaultId;

                  return (
                    <div
                      onClick={() => {
                        replaceItem(pizza);
                      }}
                      key={pizza.id}
                      className={`${styles.pizza_option} ${
                        isSelected ? styles.pissa_active : ""
                      }`}
                    >
                      <Image
                        src={pizza.image}
                        alt={pizza.title}
                        width={156}
                        height={156}
                      />
                      <p>{pizza.title}</p>
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
              const preferredSize = item.preferredSize;

              const selectedVariant = product.variants?.find(
                (variant) => variant.size === preferredSize
              );
              console.log("selectedVariant", selectedVariant);

              const selectedExtrasTitles = (selectedExtrasMap[index] || [])
                .map((id) => pizzaExtras.find((e) => e.id === id)?.title)
                .filter(Boolean);

              return (
                <article
                  key={item.defaultId}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (showExtras && replaceItemIndex !== index) return;

                    if (replaceItemIndex === index) {
                      setReplaceItemIndex(null);
                      setShowExtras(false);
                    } else {
                      setReplaceItemIndex(index);
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
                          {selectedThicknessMap[index]?.value}{" "}
                          {selectedVariant.size} , {selectedVariant.weight}{" "}
                          {selectedVariant.weightUnit}
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
                            console.log("extras", extras);

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
                        {replaceItemIndex === null && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setReplaceItemIndex((prev) =>
                                prev === index ? null : index
                              );
                            }}
                            className={styles.replace}
                          >
                            Заменить
                          </button>
                        )}
                        {!showExtras && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setReplaceItemIndex(index); // запомни, какую карточку редактируем
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
                  {replaceItemIndex === index && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      ref={groupRef}
                      className={styles.thicknessGroup}
                    >
                      <div ref={indicatorRef} className={styles.selected}></div>

                      {thicknessOptions.map((option) => (
                        <div className={styles.wrapper_option} key={option.key}>
                          <input
                            type="radio"
                            id={option.value}
                            name="thickness"
                            value={option.value}
                            className={styles.hiddenInput}
                            checked={
                              selectedThicknessMap[index]?.key === option.key
                            }
                            onChange={() =>
                              setSelectedThicknessMap((prev) => ({
                                ...prev,
                                [index]: option,
                              }))
                            }
                          />
                          <label
                            ref={
                              option.key === "traditional"
                                ? traditionalRef
                                : thinRef
                            }
                            htmlFor={option.value}
                            className={styles.thicknessOption}
                          >
                            {option.value}
                          </label>
                        </div>
                      ))}
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
                  Комбо <span>{pizzaPrice.toLocaleString("ru-RU")} тг.</span>
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
    </ModalWrapper>
  );
};

export default ComboModal;
