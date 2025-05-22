import Image from "next/image";
import styles from "./Gallery.module.scss";

const Gallery = () => {
  return (
    <section className={styles.section}>
      <div className={styles.gallery}>
        <div>
          <Image
            src={"https://i.ibb.co.com/5xK3Lb0C/1.jpg"}
            width={1280}
            height={768}
            alt="img"
            
          />
        </div>
        <div className={styles.couple}>
          <Image
            src={"https://i.ibb.co.com/mCcp1W0f/2.jpg"}
            width={630}
            height={768}
            alt="img"
          />
          <Image
            src={"https://i.ibb.co.com/G48cxF9H/23.jpg"}
            width={630}
            height={768}
            alt="img"
          />
        </div>
        <div>
          <Image
            src={"https://i.ibb.co.com/Q71JFHq7/3.jpg"}
            width={1280}
            height={768}
            alt="img"
          />
        </div>
        <div className={styles.imgRight}>
          <Image
            src={"https://i.ibb.co.com/BHsKgpBS/4.jpg"}
            width={1024}
            height={768}
            alt="img"
          />
        </div>
        <div className={styles.couple}>
          <Image
            src={"https://i.ibb.co.com/v6VkzXxR/5.jpg"}
            width={630}
            height={500}
            alt="img"
          />
          <Image
            src={"https://i.ibb.co.com/JFwH2k5s/56.jpg"}
            width={630}
            height={500}
            alt="img"
          />
        </div>
        <div>
          <Image
            src={"https://i.ibb.co.com/TqmbyhGG/6.jpg"}
            width={1024}
            height={768}
            alt="img"
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
