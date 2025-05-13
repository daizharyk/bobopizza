import styles from "./PopularOrders.module.scss";
import data from "@/data/data.json";
import Image from "next/image";

const { popularOrders } = data;

const PopularOrders = () => {
  return (
    <section className={styles.container}>
      <h2>Часто заказывают</h2>
      <div className={styles.wrapper}>
        {popularOrders.map((item) => (
          <article key={item.id}>
            <Image
              src={item.variants[0].cover}
              alt={item.title}
              width={80}
              height={80}
            />
            <div className={styles.info_wrapper}>
              <h3>{item.title}</h3>
              <div className={styles.price}>{item.variants[0].price} тг.</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularOrders;
