"use client";
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
  console.log(option);
  
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
              selectedOptionMap[optionGroup.type]?.key === choice.key;

            return (
              <div className={styles.wrapper_option} key={choice.key}>
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
      ))}
    </div>
  );
};

export default OptionGroupSelector;
