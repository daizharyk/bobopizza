"use client";
import { useEffect } from "react";
import styles from "./OptionGroupSelector.module.scss";

const OptionGroupSelector = ({
  product,
  replaceItemIndex,
  item,
  selectedOptionMap,
  setSelectedOptionMap,
  groupRef,
  indicatorRef,
  refs,
  className,
}) => {
  const option = product || item || [];
  const uniqueId = item?.defaultId || item?.id;

  useEffect(() => {
    let currentOption = selectedOptionMap[replaceItemIndex];

    // если ещё ничего не выбрали — берём дефолт из product
    if (!currentOption && option?.options) {
      option.options.forEach((group) => {
        const defaultKey = group.default;
        const defaultChoice = group.choices.find((c) => c.key === defaultKey);
        if (defaultChoice) {
          currentOption = {
            key: defaultChoice.key,
            label: defaultChoice.label,
          };
        }
      });
    }

    const currentRef = refs.current[currentOption?.key || ""];
    const indicator = indicatorRef.current;
    const group = groupRef.current;

    if (!currentRef || !indicator || !group) return;

    const optionRect = currentRef.getBoundingClientRect();
    const groupRect = group.getBoundingClientRect();
    const offsetLeft = optionRect.left - groupRect.left;

    indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
  }, [selectedOptionMap, replaceItemIndex, option]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={groupRef}
      className={`${styles.thicknessGroup} ${className ? className : ""}`}
    >
      <div ref={indicatorRef} className={styles.selected}></div>
      {option.options?.map((optionGroup, groupIndex) => (
        <div key={groupIndex} className={styles.optionGroup}>
          {optionGroup.choices.map((choice) => {
            const isChecked =
              selectedOptionMap[replaceItemIndex]?.key === choice.key ||
              (!selectedOptionMap[replaceItemIndex] &&
                optionGroup.default === choice.key);

            return (
              <div className={styles.wrapper_option} key={choice.key}>
                <input
                  type="radio"
                  id={`${optionGroup.type}_${choice.key}_${uniqueId}`}
                  name={`${optionGroup.type}_${uniqueId}`}
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
                  htmlFor={`${optionGroup.type}_${choice.key}_${uniqueId}`}
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
      ))}
    </div>
  );
};

export default OptionGroupSelector;
