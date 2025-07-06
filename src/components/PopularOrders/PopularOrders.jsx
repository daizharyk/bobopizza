"use client";
import styles from "./PopularOrders.module.scss";
import data from "@/data/data.json";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../utils/addItemToCart";

const { pizzas, snacks } = data;

const popularPizzaIds = [10, 9, 8];
const popularSnackIds = [12];

// Фильтруем по ID
const popularPizzas = pizzas.filter((item) =>
  popularPizzaIds.includes(item.id)
);
const popularSnacks = snacks.filter((item) =>
  popularSnackIds.includes(item.id)
);

const popularOrders = [...popularPizzas, ...popularSnacks];

const PopularOrders = ({ onOpenModal }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    if (item.customizable) {
      onOpenModal(item);
    } else {
      addItemToCart(dispatch, item);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Часто заказывают</h2>
      <div className={styles.wrapper}>
        {popularOrders.map((item) => (
          <article onClick={() => handleAddToCart(item)} key={item.id}>
            <Image src={item.image} alt={item.title} width={80} height={80} />
            <div className={styles.info_wrapper}>
              <h3>{item.title}</h3>
              <div className={styles.price}>
                {item.variants?.[0]?.price
                  ? `от ${item.variants[0].price} тг.`
                  : `${item.price} тг.`}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularOrders;
