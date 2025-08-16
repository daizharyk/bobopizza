import data from "@/data/data.json";
import { getProductContent } from "@/features/open-product-modal/ui/getProductContent";
import styles from "./page.module.scss";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";
export default function ProductPage({ params }) {
  const productIdNum = Number(params.id);

  const item =
    productIdNum === 0 && params.id === "combo"
      ? data.combo
      : data.items?.find((p) => p.id === productIdNum);

  if (!item) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <ArrowLeft className={styles.arrow} />
      </div>
      <div>{getProductContent(item)}</div>
    </div>
  );
}
