import ModalWrapper from "@/shared/ui/Modal/ProductModalWrapper";
import { getProductContent } from "./getProductContent";


const CustomProductModal = ({ item, onClose }) => {
  if (!item) return null;
  
  return (
    <ModalWrapper onClose={onClose}>
      {getProductContent(item, onClose)}
    </ModalWrapper>
  );
};

export default CustomProductModal;
