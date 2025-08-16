import Image from "next/image";
import styles from "./EmptyCartMessage.module.scss";

import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import { useRouter } from "next/navigation";

const EmptyCartMessage = () => {
  const router = useRouter();

  const isMobile = useIsMobile();
  const handleGoHome = () => {
    router.push("/");
  };
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
      {isMobile && (
        <button className={styles.button} onClick={handleGoHome}>
          Вернуться в меню
        </button>
      )}
    </div>
  );
};

export default EmptyCartMessage;
