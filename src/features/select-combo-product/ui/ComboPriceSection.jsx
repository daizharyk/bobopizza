import AddToCartButton from "@/shared/ui/AddToCartButton/AddToCartButton";
import styles from "./ComboPriceSection.module.scss";

const ComboPriceSection = ({
  selectedExtrasMap,
  itemsPrice,
  formattedPrice,
  handleAddToCart,
  showExtras,
  comboItems,
  allItems,
  pizzaExtras,
  className,
}) => {
  
  return (
    <div className={`${styles.price_wrapper} ${className}`}>
      {Object.values(selectedExtrasMap).some((arr) => arr.length > 0) && (
        <div className={styles.extra_price}>
          <div className={styles.price_combo}>
            Комбо <span>{itemsPrice.toLocaleString("ru-RU")} тг.</span>
          </div>
          {Object.entries(selectedExtrasMap).map(([index, extras]) => {
            const comboItem = comboItems[index];
            const product = allItems.find((p) => p.id === comboItem?.defaultId);
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
  );
};

export default ComboPriceSection;
