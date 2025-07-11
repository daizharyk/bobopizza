import styles from "./AddToCartButton.module.scss";

const AddToCartButton = ({ onAddToCart, totalPrice }) => {
  return (
    <button onClick={onAddToCart} className={styles.to_cart_button}>
      В корзину за {totalPrice} тг
    </button>
  );
};

export default AddToCartButton;
