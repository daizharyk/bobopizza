"use client";
import { useDispatch } from "react-redux";
import styles from "./ProductCard.module.scss";
import { addItemToCart } from "../utils/addItemToCart";

const { default: Image } = require("next/image");

const ProductCard = ({ item, onOpenModal }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (item.customizable) {
      onOpenModal(item);
    } else {
      addItemToCart(dispatch, item);
    }
  };

  return (
    <article className={styles.article}>
      <Image
        className={styles.image}
        src={item.image}
        alt={item.title}
        width={280}
        height={280}
        onClick={() => onOpenModal(item)}
      />
      <div className={styles.info}>
        <h3>{item.title}</h3>
        <p className={styles.description}>{item.ingredients}</p>
        <div className={styles.price_wrapper}>
          <div className={styles.price}>
            {item.variants?.[0]?.price
              ? `от ${Number(item.variants[0].price).toLocaleString(
                  "ru-RU"
                )} тг.`
              : item.price
              ? `${Number(item.price).toLocaleString("ru-RU")} тг.`
              : "Цена не указана"}
          </div>
          <button onClick={handleAddToCart}>{`${
            item.half ? "Собрать" : item.customizable ? "Выбрать" : "В корзину"
          }`}</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
