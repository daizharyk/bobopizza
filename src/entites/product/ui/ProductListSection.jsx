"use client";

import ProductCard from "./ProductCard";
import styles from "./ProductListSection.module.scss";

const ProductListSection = ({
  title,
  items,
  id,
  itemType,
  onOpenModal,
  allItems,
}) => {
  const handleOpenModal = (item) => {
    onOpenModal({ ...item, type: item.type || itemType });
  };


  return (
    <section id={id} className={styles.container}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>

      <div className={styles.wrapper}>
        
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onOpenModal={handleOpenModal}
            allItems={allItems}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductListSection;
