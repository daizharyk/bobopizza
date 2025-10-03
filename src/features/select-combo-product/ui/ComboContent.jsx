"use client";
import Image from "next/image";
import styles from "./ComboContent.module.scss";
import data from "@/data/data.json";
import pizzaExtras from "@/data/pizzaExtras.json";

import { useComboContent } from "../modal/useComboContent";
import ComboExtrasOverlay from "./ComboExtrasOverlay";
import ComboPriceSection from "./ComboPriceSection";
import ComboItemCard from "./ComboItemCard";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import MobilePizzaList from "./MobilePizzaList";

const allItems = [...data.items];

const ComboModal = ({ item, onClose }) => {
  const isMobile = useIsMobile();
  const {
    replaceItemIndex,
    setReplaceItemIndex,
    replaceItemType,
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
    replaceItem,
    itemToAdd,
    handleAddToCart,
  } = useComboContent(item, onClose);

  return (
    <section className={styles.container}>
      <article className={styles.image_combo}>
        {replaceItemIndex !== null ? (
          !isMobile ? (
            // Десктопная версия
            <div className={styles.pizza_list}>
              {allItems
                .filter((item) => item.type === replaceItemType)
                .map((item) => {
                  const isSelected =
                    item.id === comboItems[replaceItemIndex].defaultId;

                  return (
                    <div
                      onClick={() => replaceItem(item)}
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
            <MobilePizzaList
              setShowExtras={setShowExtras}
              pizzaExtras={pizzaExtras}
              groupRef={groupRef}
              indicatorRef={indicatorRef}
              showExtras={showExtras}
              refs={refs}
              isMobile={isMobile}
              comboItems={comboItems}
              setReplaceItemType={setReplaceItemType}
              setReplaceItemIndex={setReplaceItemIndex}
              replaceItem={replaceItem}
              setSelectedOptionMap={setSelectedOptionMap}
              selectedOptionMap={selectedOptionMap}
              selectedExtras={selectedExtrasMap[replaceItemIndex] || []}
              setSelectedExtrasMap={setSelectedExtrasMap}
              selectedExtrasMap={selectedExtrasMap}
              replaceItemIndex={replaceItemIndex}
              toggleExtra={toggleExtra}
              items={allItems.filter((item) => item.type === replaceItemType)}
              onSelect={replaceItem}
              activeId={comboItems[replaceItemIndex].defaultId}
              onClose={() => {
                setReplaceItemIndex(null);
                setReplaceItemType(null);
              }}
            />
          )
        ) : (
          <Image
            className={styles.image}
            alt={item.title}
            src={item.image}
            width={535}
            height={535}
          />
        )}

        {showExtras && (
          <ComboExtrasOverlay
            setShowExtras={setShowExtras}
            pizzaExtras={pizzaExtras}
            selectedExtras={selectedExtrasMap[replaceItemIndex] || []}
            setSelectedExtrasMap={setSelectedExtrasMap}
            selectedExtrasMap={selectedExtrasMap}
            replaceItemIndex={replaceItemIndex}
            toggleExtra={toggleExtra}
          />
        )}
      </article>
      <div className={styles.right_section}>
        <ComboItemCard
          {...{
            item,
            comboItems,
            allItems,
            selectedExtrasMap,
            pizzaExtras,
            showExtras,
            replaceItemIndex,
            setReplaceItemIndex,
            setReplaceItemType,
            setShowExtras,
            selectedOptionMap,
            groupRef,
            indicatorRef,
            refs,
            setSelectedOptionMap,
            setLastActiveIndex,
            isMobile,
          }}
        />
        <ComboPriceSection
          selectedExtrasMap={selectedExtrasMap}
          itemsPrice={itemsPrice}
          formattedPrice={formattedPrice}
          handleAddToCart={handleAddToCart}
          showExtras={showExtras}
          comboItems={comboItems}
          allItems={allItems}
          pizzaExtras={pizzaExtras}
          className={styles.price_section}
        />
      </div>
    </section>
  );
};

export default ComboModal;
