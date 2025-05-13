import data from "@/data/data";
import Image from "next/image";
import styles from "./NewsSlider.module.scss";

const news = data["news"];
const NewsSlider = () => {
  return (
    <section className={styles.container}>
      <div className={styles.control_left}></div>

      <div className={styles.images_wrapper}>
        {news.map((cover) => (
          <article key={cover.id}>
            <Image
              src={cover.cover}
              alt={`Обложка ${cover.id}`}
              width={198}
              height={248}
            />
          </article>
        ))}
      </div>

      <div className={styles.control_right}></div>
    </section>
  );
};

export default NewsSlider;
