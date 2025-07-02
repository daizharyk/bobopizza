// utils/addItemToCart.js

import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "react-hot-toast";

export const addItemToCart = (dispatch, item, onClose) => {
  dispatch(addToCart(item));
  toast.success(`Добавлено: ${item.title}, 1 шт.`);
  if (typeof onClose === "function") onClose();
};
