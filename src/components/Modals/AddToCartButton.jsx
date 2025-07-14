import styles from "./AddToCartButton.module.scss";

const AddToCartButton = ({ onAddToCart, totalPrice }) => {
  return (
    <button onClick={onAddToCart} className={styles.to_cart_button}>
      {totalPrice > 0 ? `В корзину за ${totalPrice} тг` : "В корзину"}
    </button>
  );
};

export default AddToCartButton;
