export const calculatePrice = (selectedSides) => {
  if (!selectedSides) {
    return { totalPrice: null, left: null, right: null };
  }

  const get35Price = (pizza) => {
    if (!pizza?.variants) return 0;
    const variant = pizza.variants.find((v) => v.size === 35);
    return variant ? variant.price / 2 : 0;
  };
  const leftPrice = selectedSides.left ? get35Price(selectedSides.left) : null;
  const rightPrice = selectedSides.right
    ? get35Price(selectedSides.right)
    : null;

  const totalPrice =
    leftPrice || rightPrice
      ? Math.round((leftPrice || 0) + (rightPrice || 0))
      : null;

  return {
    totalPrice,
    left:
      leftPrice !== null ? Math.round(leftPrice).toLocaleString("ru-RU") : null,
    right:
      rightPrice !== null
        ? Math.round(rightPrice).toLocaleString("ru-RU")
        : null,
  };
};
