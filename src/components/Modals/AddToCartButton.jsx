import styles from "./AddToCartButton.module.scss";

const AddToCartButton = ({ onAddToCart, selectedVariant }) => {
  return (
    <button onClick={onAddToCart} className={styles.to_cart_button}>
      В корзину за {selectedVariant} тг
    </button>
  );
};

export default AddToCartButton;
