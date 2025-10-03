import { useEffect, useRef, useState } from "react";
import styles from "./MobilePizzaList.module.scss";
import Image from "next/image";
import ComboExtrasOverlay from "./ComboExtrasOverlay";
import OptionGroupSelector from "./OptionGroupSelector";
import { useInView } from "@/shared/lib/hooks/useInView";

const MobilePizzaList = ({
  items,
  onSelected,
  activeId,
  onClose,
  comboItems,
  replaceItem,
  pizzaExtras,
  setSelectedExtrasMap,
  toggleExtra,
  setShowExtras,
  showExtras,
  selectedExtrasMap,
  replaceItemIndex,
  selectedOptionMap,
  setSelectedOptionMap,
  isMobile,
  groupRef,
  setReplaceItemType,
  setReplaceItemIndex,
  indicatorRef,
  refs,
}) => {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedPizzaId = comboItems[replaceItemIndex]?.defaultId;
  const selectedPizza = items.find((p) => p.id === selectedPizzaId);

  const orderedItems = selectedPizza
    ? [selectedPizza, ...items.filter((p) => p.id !== selectedPizzaId)]
    : items;

  return (
    <div className={styles.overlay}>
      <button onClick={onClose} className={styles.closeBtn}>
        ×
      </button>
      {flippedIndex != null && (
        <div className={styles.extras_title}>Меняйте на свой вкус</div>
      )}

      {flippedIndex === null && (
        <span className={styles.counter}>
          {items.length > 0 ? `${currentIndex + 1}/${items.length}` : "0/0"}
        </span>
      )}

      <div className={styles.cardWrapper}>
        {orderedItems.map((item, index) => {
          const variant30 = item.variants?.find((v) => v.size === 30);
          const isFlipped = flippedIndex === index;
          const ref = useRef(null);
          const inView = useInView(ref, 0.6);

          const isInCombo = comboItems.some(
            (comboItem) => comboItem.defaultId === item.id
          );

          useEffect(() => {
            if (inView) {
              setCurrentIndex(index);
            }
          }, [inView, index]);

          return (
            <div ref={ref} key={index} className={styles.cardParent}>
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
                    <button
                      className={styles.selectButton}
                      onClick={() => {
                        if (!isInCombo) {
                          replaceItem(item);
                          setReplaceItemIndex(null);
                          setReplaceItemType(null);
                        } else {
                          setReplaceItemIndex(null);
                          setReplaceItemType(null);
                        }
                      }}
                    >
                      {isInCombo ? "Уже в комбо" : "Выбрать"}
                    </button>
                  </div>
                </div>

                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                  <ComboExtrasOverlay
                    className={styles.extra}
                    setShowExtras={() => setFlippedIndex(null)}
                    pizzaExtras={pizzaExtras}
                    isMobile={isMobile}
                    selectedExtras={selectedExtrasMap[replaceItemIndex] || []}
                    setSelectedExtrasMap={setSelectedExtrasMap}
                    selectedExtrasMap={selectedExtrasMap}
                    replaceItemIndex={replaceItemIndex} // ← для десктопа
                    pizzaIndex={index}
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
