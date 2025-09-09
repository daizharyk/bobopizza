import ComboModal from "@/features/select-combo-product/ui/ComboContent";
import PizzaHalfModal from "@/features/select-half-pizza/ui/PizzaHalfContent";
import PizzaModal from "@/features/select-pizza-product/ui/PizzaContent";
import SimpleProductModal from "@/features/select-simple-product/ui/SimpleProductContent";

export const getProductContent = (item, onClose) => {
  if (!item) return null;


  
  switch (item.type) {
    case "pizza":
      return <PizzaModal item={item} onClose={onClose} />;
    case "half-pizza":
      return <PizzaHalfModal item={item} onClose={onClose} />;
    case "combo":
      return <ComboModal item={item} onClose={onClose} />;
    case "cocktail":
    case "coffee":
    case "snack":
    case "sauce":
    case "drink":
      return <SimpleProductModal item={item} onClose={onClose} />;
    default:
      return null;
  }
};
