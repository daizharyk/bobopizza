import Image from "next/image";
import styles from "./ComboItemCard.module.scss";
const ComboItemCard = ({
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
  setSelectedOptionMap,
  setLastActiveIndex,
  isMobile,
  refs,
}) => {
  
  return (
    <div className={styles.wrapper}>
      <article className={styles.info_wrapper}>
        <div className={styles.info}>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.description}>{item.ingredients}</p>
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
                showExtras && replaceItemIndex !== index ? styles.disabled : ""
              }`}
            >
              <div className={styles.top_wrapper}>
                <div className={styles.image}>
                  <Image
                    alt={product.title}
                    src={product.image}
                    className={styles.pizza_img}
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
                    {product.type === "pizza" && !showExtras && !isMobile && (
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
      
    </div>
  );
};

export default ComboItemCard;
