import { useState } from "react";
import styles from "./MobilePizzaList.module.scss";
import Image from "next/image";
import ComboExtrasOverlay from "./ComboExtrasOverlay";
import OptionGroupSelector from "./OptionGroupSelector";
import AddToCartButton from "@/shared/ui/AddToCartButton/AddToCartButton";

const MobilePizzaList = ({
  items,
  onSelected,
  activeId,
  onClose,
  pizzaExtras,
  setSelectedExtrasMap,
  toggleExtra,
  setShowExtras,
  selectedExtrasMap,
  replaceItemIndex,
  selectedOptionMap,
  setSelectedOptionMap,
  groupRef,
  indicatorRef,
  refs,
}) => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <div className={styles.overlay}>
      <button onClick={onClose} className={styles.closeBtn}>
        ×
      </button>

      <span className={styles.counter}>
        {items.length > 0 ? `1/${items.length}` : "0/0"}
      </span>

      <div className={styles.cardWrapper}>
        {items.map((item, index) => {
          const variant30 = item.variants?.find((v) => v.size === 30);
          const isFlipped = flippedIndex === index;

          return (
            <div key={index} className={styles.cardParent}>
              <div
                className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
              >
                {/* FRONT */}
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                  <div className={styles.top}>
                    {" "}
                    <Image
                      className={styles.image}
                      src={item.image}
                      alt={item.title}
                      width={181}
                      height={181}
                    />
                    <h3 className={styles.title}>{item.title}</h3>
                    <div className={styles.size}>
                      {variant30
                        ? `${variant30.size} ${variant30.sizeUnit} ${variant30.weight} ${variant30.weightUnit}`
                        : ""}
                    </div>
                    <div className={styles.ingredients}>{item.ingredients}</div>
                    <button
                      className={styles.changeIngredients}
                      onClick={() => setFlippedIndex(index)}
                    >
                      Изменить состав
                    </button>
                  </div>
                  <div className={styles.bottom}>
                    {" "}
                    <OptionGroupSelector
                      className={styles.optionSelector}
                      item={item}
                      replaceItemIndex={replaceItemIndex}
                      selectedOptionMap={selectedOptionMap}
                      setSelectedOptionMap={setSelectedOptionMap}
                      groupRef={groupRef}
                      indicatorRef={indicatorRef}
                      refs={refs}
                    />
                    <AddToCartButton item={item} onSelected={onSelected} />
                  </div>
                </div>

                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                  <ComboExtrasOverlay
                    className={styles.extra}
                    setShowExtras={() => setFlippedIndex(null)}
                    pizzaExtras={pizzaExtras}
                    selectedExtras={selectedExtrasMap[replaceItemIndex] || []}
                    setSelectedExtrasMap={setSelectedExtrasMap}
                    selectedExtrasMap={selectedExtrasMap}
                    replaceItemIndex={replaceItemIndex}
                    toggleExtra={toggleExtra}
                  />
                  <button
                    className={styles.closeBack}
                    onClick={() => setFlippedIndex(null)}
                  >
                    Назад
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobilePizzaList;
