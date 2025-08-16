import styles from "./AddToCartButton.module.scss";

const AddToCartButton = ({
  disabled,
  onAddToCart,
  totalPrice,
  className = "",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onAddToCart}
      className={`${styles.to_cart_button} ${className}`}
    >
      {totalPrice > 0 ? `В корзину за ${totalPrice} тг` : "В корзину"}
    </button>
  );
};

export default AddToCartButton;
