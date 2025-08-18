export const calculatePrice = (selectedSides) => {
  if (!selectedSides) return 0;

  let price = 0;

  const get35Price = (pizza) => {
    if (!pizza?.variants) return 0;
    const variant = pizza.variants.find((v) => v.size === 35);
    return variant ? variant.price / 2 : 0;
  };

  if (selectedSides.left) {
    price += get35Price(selectedSides.left);
  }

  if (selectedSides.right) {
    price += get35Price(selectedSides.right);
  }

  return Math.round(price);
};
