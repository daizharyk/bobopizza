"use client";
import styles from "./PizzaHalfContent.module.scss";
import { addItemToCart } from "@/components/utils/addItemToCart";
import { useDispatch } from "react-redux";

import data from "@/data/data.json";
import { usePizzaHalf } from "../model/hooks/usePizzaHalf";
import SelectedHalf from "./SelectedHalf";
import HalfPizzaInfo from "./HalfPizzaInfo";
import { useState } from "react";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";

const pizzas = data["items"].filter((item) => item.type === "pizza");

const PizzaHalfContent = ({ item, onClose }) => {
  const dispatch = useDispatch();

  const isMobile = useIsMobile();
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
    setSelectedSides,
  } = usePizzaHalf(item, onClose, addItemToCart, dispatch);

  const bothSelected = selectedSides.left && selectedSides.right;
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.content}>
      <SelectedHalf
        pizzas={pizzas}
        selectedSides={selectedSides}
        handlePizzaClick={handlePizzaClick}
        refs={refs}
        bothSelected={bothSelected}
        totalPrice={totalPrice}
        setShowInfo={setShowInfo}
      />
      {(isMobile ? showInfo : true) && (
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
          setSelectedSides={setSelectedSides}
          setShowInfo={setShowInfo}
        />
      )}
    </div>
  );
};

export default PizzaHalfContent;
