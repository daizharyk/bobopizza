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
        {itemType === "pizzas" && (
          <ProductCard
            key="half-pizza"
            item={{
              id: "half-pizza",
              title: "Пицца из половинок",
              ingredients: "Соберите свою пиццу 35 см с двумя разными вкусами",
              image:
                "https://i.ibb.co.com/50ttRbf/0195dc96b2da74aabee7a671f52b731b.webp",
              price: 0,
              customizable: true,
              half: true,
            }}
            onOpenModal={() =>
              handleOpenModal({
                id: "half-pizza",
                title: "Собери половинки",
                type: "half-pizza",
                customizable: true,
              })
            }
          />
        )}
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
