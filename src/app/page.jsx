"use client";
import DeliveryInfo from "@/components/Delivery Info/DeliveryInfo";
import CustomProductModal from "@/components/Modals/CustomProductModal";
import PopularOrders from "@/components/PopularOrders/PopularOrders";
import ProductListSection from "@/components/ProductListSection/ProductListSection";
import Label from "@/components/svg/WithoutPigLabel";
import data from "@/data/data.json";
import { useState } from "react";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => setSelectedItem(item);
  const handleCloseModal = () => setSelectedItem(null);
  return (
    <>
      <PopularOrders onOpenModal={handleOpenModal} />
      <Label />
      {data.categories.map(({ label, targetId }) => {
        const items = data[targetId];
        return Array.isArray(items) ? (
          <ProductListSection
            key={targetId}
            id={targetId}
            title={label}
            items={items}
            itemType={targetId}
            onOpenModal={handleOpenModal}
          />
        ) : null;
      })}
      <DeliveryInfo />
      {selectedItem && (
        <CustomProductModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </>
  );
}
