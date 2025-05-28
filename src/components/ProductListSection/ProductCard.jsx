import styles from "./ProductCard.module.scss";

const { default: Image } = require("next/image");

const ProductCard = ({ item }) => {
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
          <button>Выбрать</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
