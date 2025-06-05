"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductListSection.module.scss";
import CustomProductModal from "../Modals/CustomProductModal";

const ProductListSection = ({ title, items, id, itemType }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem({ ...item, type: itemType });
  };

  const handleCloseModal = () => setSelectedItem(null);

  return (
    <section id={id} className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.wrapper}>
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>
      {selectedItem && (
        <CustomProductModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default ProductListSection;
