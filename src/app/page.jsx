"use client";
import DeliveryInfo from "@/components/Delivery Info/DeliveryInfo";
import CustomProductModal from "@/components/Modals/CustomProductModal";
import ProductListSection from "@/components/ProductListSection/ProductListSection";
import Label from "@/components/svg/WithoutPigLabel";
import data from "@/data/data.json";

import { useModal } from "./context/ModalContext";

export default function Home() {
  if (!data.items) return null;

  const { selectedItem, openModal, closeModal } = useModal();
  return (
    <>
      <div className="labelWrapper">
        <Label />
      </div>

      {data.categories.map(({ label, targetId }) => {
        const items =
          targetId === "combo"
            ? data.combo
            : data.items?.filter((item) => item.type === targetId);

        return items.length > 0 ? (
          <ProductListSection
            key={targetId}
            id={targetId}
            title={label}
            items={items}
            itemType={targetId}
            onOpenModal={openModal}
            allItems={data.items}
          />
        ) : null;
      })}
      <DeliveryInfo />
      {selectedItem && (
        <CustomProductModal item={selectedItem} onClose={closeModal} />
      )}
    </>
  );
}
