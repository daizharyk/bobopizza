import data from "@/data/data";
import Image from "next/image";
import styles from "./NewsSlider.module.scss";
import { LeftButton } from "../svg/LeftButton";
import RightButton from "../svg/RightButton";


const news = data["news"];
const NewsSlider = () => {
  return (
    <section className={styles.container}>
      <div className={styles.control_left}>
        <LeftButton />
      </div>

      <div className={styles.images_wrapper}>
        {news.map((cover) => (
          <article key={cover.id}>
            <Image
              src={cover.cover}
              alt={`Обложка ${cover.id}`}
              width={1280}
              height={373}
            />
          </article>
        ))}
      </div>

      <div className={styles.control_right}>
        <RightButton />
      </div>
    </section>
  );
};

export default NewsSlider;
