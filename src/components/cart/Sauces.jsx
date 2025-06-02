import Image from "next/image";
import styles from "./Sauces.module.scss";
import data from "@/data/data.json";
import { CartCloseSVG } from "../svg/CartCloseSVG";

const sauces = data.sauces;

const Sauces = ({ openSauces, onClose, className }) => {
  if (!openSauces) return null;

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className={styles.close_button}>
        <CartCloseSVG />
      </button>
      <h3 className={styles.title}>Соусы к бортикам и закускам</h3>
      <div className={styles.sauces_wrapper}>
        {sauces.map((sauce) => (
          <div key={sauce.id} className={styles.wrapper}>
            <div className={styles.img_wrapper}>
              <Image
                src={sauce.image}
                alt={sauce.title}
                width={73}
                height={73}
              />
              <div className={styles.name}>{sauce.title}</div>
            </div>

            <div className={styles.price_wrapper}>
              <button className={styles.price}> {sauce.price}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sauces;
