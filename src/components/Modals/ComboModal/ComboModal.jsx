import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import styles from "./ComboModal.module.scss";
import data from "@/data/data.json";
import AddToCartButton from "../AddToCartButton";

const allItems = [...data.items];


const ComboModal = ({ item, onClose }) => {
  console.log("item", item);

  return (
    <ModalWrapper onClose={onClose}>
      <section className={styles.container}>
        <article className={styles.image}>
          <Image alt={item.title} src={item.image} width={535} height={535} />
        </article>
        <div>
          <div className={styles.info}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          {item.items.map((item) => {
            const product = allItems.find((p) => p.id === item.defaultId);
            console.log("product", product);

            return (
              <article key={item.id} className={styles.item}>
                <div className={styles.image}>
                  <Image
                    alt={product.title}
                    src={product.image}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.info}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                </div>
              </article>
            );
          })}
          <AddToCartButton />
        </div>
      </section>
    </ModalWrapper>
  );
};

export default ComboModal;
