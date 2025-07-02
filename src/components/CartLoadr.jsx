"use client";

import { setCartItems } from "@/store/slices/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CartLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");

    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        if (!Array.isArray(items)) {
          throw new Error("Неверный формат данных корзины");
        }
        dispatch(setCartItems(items));
      } catch (e) {
        console.error("Ошибка при загрузке корзины:", e);
        localStorage.removeItem("cartItems");
      }
    }
  }, []);

  return null;
};

export default CartLoader;
