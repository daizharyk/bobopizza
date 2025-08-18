import Image from "next/image";

import styles from "./HalfPizzaInfo.module.scss";
import PizzaSvg from "@/components/svg/ModalSvg/PizzaSvg";
import AddToCartButton from "@/shared/ui/AddToCartButton/AddToCartButton";
import GoToButton from "@/shared/ui/GoToButton/GoToButton";
import { useBottomSheet } from "@/shared/ui/useBottomSheet/useBottomSheet";

const HalfPizzaInfo = ({
  selectedSides,
  groupRef,
  indicatorRef,
  thicknessOptions,
  selectedThickness,
  setSelectedThickness,
  handleAddToCart,
  totalPrice,
  showWarning,
  traditionalRef,
  thinRef,
  setShowInfo,
  isMobile,
  showInfo,
}) => {
  const {
    panelRef,
    dragging,
    dragOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useBottomSheet({
    onClose: () => setShowInfo(false),
    isActive: showInfo,
    isMobile,
  });

  return (
    <div
      ref={panelRef}
      className={`${styles.content__info_wrapper} ${
        showInfo ? styles.active : ""
      } ${dragging ? styles.dragging : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={
        isMobile && showInfo && dragging
          ? { transform: `translate3d(0, ${dragOffset}px, 0)` }
          : undefined
      }
    >
      {isMobile && <GoToButton className={styles.go_to_button} onClick={() => setShowInfo(false)} />}

      <div className={styles.content_info}>
        <div className={styles.top_image_wrapper}>
          {selectedSides.left && (
            <Image
              src={selectedSides.left.image}
              alt={selectedSides.left.title}
              className={styles.left_image}
              width={256}
              height={256}
            />
          )}
          {selectedSides.right && (
            <Image
              src={selectedSides.right.image}
              alt={selectedSides.right.title}
              className={`${styles.right_image}`}
              width={256}
              height={256}
            />
          )}
          <PizzaSvg className={styles.pizza_svg_top} />
        </div>

        <div className={styles.pizza_info}>
          <div className={styles.pizza_label_wrapper}>
            <div className={styles.image_wrapper}>
              {selectedSides.left && (
                <Image
                  src={selectedSides.left.image}
                  alt={selectedSides.left.title}
                  width={68}
                  height={68}
                  className={styles.left_image}
                />
              )}
              <PizzaSvg
                className={`${styles.pizza_svg} ${
                  selectedSides.left ? styles.svg_faded : ""
                }`}
              />
            </div>
            {selectedSides.left ? (
              <div className={styles.pizza_info}>
                <div className={styles.pizza_title}>
                  {selectedSides.left.title}
                </div>
                <div className={styles.ingredients_label}>
                  {selectedSides.left.ingredients}
                </div>
              </div>
            ) : (
              <div className={styles.pizza_label}>Выбери левую половинку</div>
            )}
          </div>

          <div className={styles.pizza_label_wrapper}>
            <div className={styles.image_wrapper}>
              {selectedSides.right && (
                <Image
                  src={selectedSides.right.image}
                  alt={selectedSides.right.title}
                  width={68}
                  height={68}
                  className={styles.right_image}
                />
              )}
              <PizzaSvg
                className={`${styles.pizza_svg} ${
                  selectedSides.right ? styles.svg_faded : ""
                }`}
              />
            </div>
            {selectedSides.right ? (
              <div className={styles.pizza_info}>
                <div className={styles.pizza_title}>
                  {selectedSides.right.title}
                </div>
                <div className={styles.ingredients_label}>
                  {selectedSides.right.ingredients}
                </div>
              </div>
            ) : (
              <div className={styles.pizza_label}>Выбери правую половинку</div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.pizza_size_wrapper}>
        <div className={styles.sizeGroup}>
          <div className={styles.sizeLabel}>Большая 35 см</div>
          <div ref={groupRef} className={styles.thicknessGroup}>
            <div ref={indicatorRef} className={styles.selected}></div>

            {thicknessOptions.map((option) => (
              <div className={styles.wrapper_option} key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  name="thickness"
                  value={option.value}
                  className={styles.hiddenInput}
                  checked={selectedThickness === option.value}
                  onChange={() => setSelectedThickness(option)}
                />
                <label
                  ref={option.key === "traditional" ? traditionalRef : thinRef}
                  htmlFor={option.value}
                  className={styles.thicknessOption}
                >
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.add_to_cart}>
          <AddToCartButton
            onAddToCart={handleAddToCart}
            totalPrice={totalPrice}
          />
          {showWarning && (
            <div className={styles.choose_notice}>
              Выберите вторую половинку
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalfPizzaInfo;
