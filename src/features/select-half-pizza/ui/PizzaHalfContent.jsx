"use client";
import styles from "./PizzaHalfContent.module.scss";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useDispatch } from "react-redux";

import data from "@/data/data.json";
import { usePizzaHalf } from "../model/hooks/usePizzaHalf";
import SelectedHalf from "./SelectedHalf";
import HalfPizzaInfo from "./HalfPizzaInfo";

const pizzas = data["items"].filter((item) => item.type === "pizza");

const PizzaHalfModal = ({ item, onClose }) => {
  const dispatch = useDispatch();

  const {
    selectedThickness,
    setSelectedThickness,
    showWarning,
    selectedSides,
    handleAddToCart,
    handlePizzaClick,
    groupRef,
    traditionalRef,
    thinRef,
    indicatorRef,
    totalPrice,
    refs,
    thicknessOptions,
  } = usePizzaHalf(item, onClose, addItemToCart, dispatch);

  return (
    <div className={styles.content}>
      <SelectedHalf
        pizzas={pizzas}
        selectedSides={selectedSides}
        handlePizzaClick={handlePizzaClick}
        refs={refs}
      />
      <HalfPizzaInfo
        selectedSides={selectedSides}
        groupRef={groupRef}
        indicatorRef={indicatorRef}
        thicknessOptions={thicknessOptions}
        selectedThickness={selectedThickness}
        setSelectedThickness={setSelectedThickness}
        handleAddToCart={handleAddToCart}
        totalPrice={totalPrice}
        showWarning={showWarning}
        traditionalRef={traditionalRef}
        thinRef={thinRef}
      />
    </div>
  );
};

export default PizzaHalfModal;
