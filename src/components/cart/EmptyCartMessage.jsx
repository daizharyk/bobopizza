import Image from "next/image";
import styles from "./EmptyCartMessage.module.scss";

const EmptyCartMessage = () => {
  return (
    <div className={styles.container}>
      <Image
        src={"/svg/emptyCartImage.svg"}
        alt="empty Cart image "
        width={314}
        height={205}
      />
      <h3>Пока тут пусто</h3>
      <p>Добавьте пиццу. Или две! </p>
      <p>А мы доставим ваш заказ от 3 500 тг. </p>
    </div>
  );
};

export default EmptyCartMessage;
