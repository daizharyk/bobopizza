import styles from "./ProductCard.module.scss";

const { default: Image } = require("next/image");

const ProductCard = ({ item }) => {
  return (
    <article className={styles.article}>
      <Image src={item.image} alt={item.title} width={280} height={280} />
      <div className={styles.info}>
        <h3>{item.title}</h3>
        <p className={styles.description}>{item.ingredients}</p>
        <div>от {item.price}</div>
      </div>
    </article>
  );
};

export default ProductCard;
