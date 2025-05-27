import ProductCard from "./ProductCard";
import styles from "./ProductListSection.module.scss";

const ProductListSection = ({ title, items, id }) => {

  return (
    <section id={id} className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.wrapper}>
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ProductListSection;
