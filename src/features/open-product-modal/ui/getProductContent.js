import ComboModal from "@/features/select-combo-product/ui/ComboContent";
import PizzaHalfModal from "@/features/select-half-pizza/ui/PizzaHalfContent";
import PizzaModal from "@/features/select-pizza-product/ui/PizzaContent";
import SimpleProductModal from "@/features/select-simple-product/ui/SimpleProductContent";

export const getProductContent = (item, onClose) => {
  if (!item) return null;
  
  switch (item.type) {
    case "pizzas":
      return <PizzaModal item={item} onClose={onClose} />;
    case "half-pizza":
      return <PizzaHalfModal item={item} onClose={onClose} />;
    case "combo":
      return <ComboModal item={item} onClose={onClose} />;
    case "cocktails":
    case "coffee":
    case "snacks":
    case "sauces":
    case "drinks":
      return <SimpleProductModal item={item} onClose={onClose} />;
    default:
      return null;
  }
};
