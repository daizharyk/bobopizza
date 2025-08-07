"use client";
import { useDispatch } from "react-redux";
import styles from "./ProductCard.module.scss";
import { addItemToCart } from "../utils/addItemToCart";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";

const { default: Image } = require("next/image");

const ProductCard = ({ item, onOpenModal, allItems = [] }) => {
  const dispatch = useDispatch();

  const isMobile = useIsMobile();

  const calculateComboPrice = (item, allItems) => {
    if (!Array.isArray(item.items)) return 0;

    let total = 0;

    for (const comboItem of item.items) {
      const product = allItems.find((p) => p.id === comboItem.defaultId);
      if (!product) continue;

      let price = 0;

      if (
        comboItem.preferredSize &&
        product.variants &&
        product.variants.length > 0
      ) {
        const matchedVariant = product.variants.find(
          (variant) => variant.size === comboItem.preferredSize
        );
        price = matchedVariant?.price || 0;
      } else {
        // fallback: первый вариант
        price = product.variants?.[0]?.price || product.price || 0;
      }

      total += price;
    }
    return total;
  };

  const isCombo = item.comboItems && Array.isArray(item.comboItems);
  const comboPrice = isCombo ? calculateComboPrice(item, allItems) : null;

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
            {isCombo
              ? `${comboPrice.toLocaleString("ru-RU")} тг.`
              : item.variants?.[0]?.price
              ? `от ${Number(item.variants[0].price).toLocaleString(
                  "ru-RU"
                )} тг.`
              : item.price
              ? `${Number(item.price).toLocaleString("ru-RU")} тг.`
              : "Цена не указана"}
          </div>
          <button onClick={handleAddToCart}>
            {isMobile
              ? isCombo
                ? `${comboPrice.toLocaleString("ru-RU")} тг.`
                : item.variants?.[0]?.price
                ? `от ${Number(item.variants[0].price).toLocaleString(
                    "ru-RU"
                  )} тг.`
                : item.price
                ? `${Number(item.price).toLocaleString("ru-RU")} тг.`
                : "Цена не указана"
              : item.half
              ? "Собрать"
              : item.customizable
              ? "Выбрать"
              : "В корзину"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
