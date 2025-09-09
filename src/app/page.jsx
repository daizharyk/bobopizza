// pages/Home.jsx (или app/page.jsx)
"use client";

import DeliveryInfo from "@/components/Delivery_Info/DeliveryInfo";
import ProductListSection from "@/entites/product/ui/ProductListSection";
import Label from "@/components/svg/WithoutPigLabel";
import data from "@/data/data.json";
import CustomProductModal from "@/features/open-product-modal/ui/CustomProductModal";
import { useModal } from "@/app/context/ModalContext";
import { useScrollRestoration } from "@/shared/lib/hooks/useScrollRestoration";

export default function Home() {
  const { selectedItem, openModal, closeModal } = useModal();
  useScrollRestoration(); 
  if (!data?.items) return null;




  return (
    <>
      <div className="labelWrapper">
        <Label />
      </div>

      {data.categories.map(({ label, targetId }) => {
        const items =
          targetId === "combo"
            ? data.combo
            : data.items.filter((item) => item.category === targetId);

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

      {selectedItem && (
        <CustomProductModal item={selectedItem} onClose={closeModal} />
      )}

      <DeliveryInfo />
    </>
  );
}
