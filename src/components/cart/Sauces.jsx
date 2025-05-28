import Image from "next/image";
import styles from "./Sauces.module.scss";
import { CartCloseSVG } from "../svg/CartCloseSVG";
import { sauces } from "@/data/data.json";

const Sauces = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Соусы к бортикам и закускам</h3>
      <div>
        {sauces.map((sauce, index) => {
          <div key={index} className={styles.wrapper}>
            <Image src={sauce.image} alt={sauce.title} width={73} height={73} />
            <div className={styles.name}>{sauce.title}</div>
            <div>
              <button className={styles.price}> {sauce.price}</button>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Sauces;
