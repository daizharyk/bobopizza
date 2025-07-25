"use client";
import styles from "./PopularOrders.module.scss";
import data from "@/data/data.json";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../utils/addItemToCart";

const { items } = data;

const popularPizzaIds = [10, 9, 8, 12];

const popularOrders = items.filter((item) => popularPizzaIds.includes(item.id));

const PopularOrders = ({ onOpenModal }) => {
 

  const handleAddToCart = (item) => {
    onOpenModal(item);
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
