"use client";
import { useDispatch } from "react-redux";
import styles from "./ProductCard.module.scss";
import { addToCart } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";

const { default: Image } = require("next/image");

const ProductCard = ({ item, onOpenModal }) => {
  const dispatch = useDispatch();


  const handleAddToCart = () => {
    if (item.customizable) {
      onOpenModal(item);
    } else {
      dispatch(addToCart(item));
      toast.success(`Добавлено: ${item.title}, 1 шт.`);
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
      />
      <div className={styles.info}>
        <h3>{item.title}</h3>
        <p className={styles.description}>{item.ingredients}</p>
        <div className={styles.price_wrapper}>
          <div className={styles.price}>
            {item.variants?.[0]?.price
              ? `от ${item.variants[0].price} тг.`
              : item.price
              ? `${item.price} тг.`
              : "Цена не указана"}
          </div>
          <button onClick={handleAddToCart}>Выбрать</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
