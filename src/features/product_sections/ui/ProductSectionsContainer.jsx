// features/product_sections/ui/ProductSectionsContainer.jsx
"use client";
import ProductListSection from "@/entites/product/ui/ProductListSection";
import Label from "@/components/svg/WithoutPigLabel";
import data from "@/data/data.json";
import CustomProductModal from "@/features/open-product-modal/ui/CustomProductModal";
import { useModal } from "@/app/context/ModalContext";

export default function ProductSectionsContainer() {
  const { selectedItem, openModal, closeModal } = useModal();

  if (!data.items) return null;

  return (
    <>
      <div className="labelWrapper">
        <Label />
      </div>

      {data.categories.map(({ label, targetId }) => {
        const items =
          targetId === "combo"
            ? data.combo
            : data.items?.filter((item) => item.category === targetId);

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
    </>
  );
}
