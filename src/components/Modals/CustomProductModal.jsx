import CocktailModal from "./CocktailModal/CocktailModal";
import CoffeeModal from "./CoffeModal/CoffeModal";
import PizzaHalfModal from "./PizzaModal/PizzaHalfModal/PizzaHalfModal";

import PizzaModal from "./PizzaModal/PizzaModal";

const CustomProductModal = ({ item, onClose }) => {
  if (!item) return null;

  switch (item.type) {
    case "pizzas":
      return <PizzaModal item={item} onClose={onClose} />;
    case "half-pizza":
      return <PizzaHalfModal item={item} onClose={onClose} />;
    case "cocktails":
      return <CocktailModal item={item} onClose={onClose} />;
    case "combo":
      return <ComboModal item={item} onClose={onClose} />;

    case "coffee":
      return <CoffeeModal item={item} onClose={onClose} />;

    default:
      return null;
  }
};

export default CustomProductModal;
