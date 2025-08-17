export const buildHalfPizza = (
  item,
  selectedSides,
  selectedThickness,
  totalPrice
) => {
  const customId = [
    selectedThickness.key,
    selectedSides.left?.id,
    selectedSides.right?.id,
  ].join("-");

  return {
    id: customId,
    title: `${selectedSides.left?.title || ""} + ${
      selectedSides.right?.title || ""
    }`,
    leftImage: selectedSides.left?.image,
    rightImage: selectedSides.right?.image,
    price: totalPrice,
    customizable: item.customizable,
    thickness: selectedThickness,
    half: true,
    size: "35",
    sizeUnit: "см",
  };
};
