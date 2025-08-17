export const calculatePrice = (selectedSides) => {
  if (!selectedSides) return 0;

  let price = 0;

  if (selectedSides.left) {
    price += selectedSides.left.variants[2].price / 2;
  }

  if (selectedSides.right) {
    price += selectedSides.right.variants[2].price / 2;
  }

  return Math.round(price);
};
