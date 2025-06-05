import PizzaModal from "./PizzaModal/PizzaModal";


const CustomProductModal = ({ item, onClose }) => {

  if (!item) return null;




  switch (item.type) {
    case "pizzas":
      return <PizzaModal item={item} onClose={onClose} />;

    case "combo":
      return <ComboModal item={item} onClose={onClose} />;

    case "coffee":
      return <CoffeeModal item={item} onClose={onClose} />;

    default:
      return null;
  }
};

export default CustomProductModal;
