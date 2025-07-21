import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import styles from "./ComboModal.module.scss";
import data from "@/data/data.json";
import pizzaExtras from "@/data/pizzaExtras.json";
import AddToCartButton from "../AddToCartButton";
import { useEffect, useRef, useState } from "react";
import PizzaExtrasSelector from "@/components/PizzaExtrasSelector/PizzaExtrasSelector";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";

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

  console.log("comboItems", comboItems);

  console.log("selectedExtrasMap", selectedExtrasMap);

  const [selectedThicknessMap, setSelectedThicknessMap] = useState({});

  console.log("selectedThicknessMap", selectedThicknessMap);

  const indicatorRef = useRef(null);
  const traditionalRef = useRef(null);
  const thinRef = useRef(null);
  const groupRef = useRef(null);

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
  console.log("preferredSize", item.preferredSize);

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

  console.log("selectedVariants", selectedVariants);

  const totalPrice = selectedVariants
    .filter(Boolean) // удалит undefined
    .reduce((total, variant) => total + variant.price, 0);

  console.log("totalPrice", totalPrice);

  //   const pizzaToAdd = {
  //     id: customId,
  //     // title: item.title,
  //     // image: item.image,
  //     // size: selectedVariant.size,
  //     // price: totalPrice,
  //     // thickness: selectedThickness,
  //     // extras: selectedExtrasTitles,
  //     // customizable: item.customizable,
  //   };

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
                  onClick={() => setSelectedExtrasMap({})}
                >
                  Сбросить
                </button>
              </div>
            </div>
          )}
        </article>
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
          <div className={styles.price_wrapper}>
            <div className={styles.price}>44444</div>
            <AddToCartButton className={styles.button} />
          </div>
        </article>
      </section>
    </ModalWrapper>
  );
};

export default ComboModal;
