import DodoBookSvg from "@/components/svg/AboutUsPageSVG/DodoBookSvg";
import styles from "./DodoBook.module.scss";

const DodoBook = () => {
  return (
    <section className={styles.section}>
      <div className={styles.text}>
        Если вы испытываете похожие чувства — прочитайте нашу книгу, и может
        быть мы станем друзьями. Если считаете, что это полная ерунда и так не
        бывает — всё равно прочитайте и расскажите, что думаете.
      </div>
      <DodoBookSvg className={styles.dodoBookSvg} />
    </section>
  );
};

export default DodoBook;
