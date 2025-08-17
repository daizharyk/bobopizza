import data from "@/data/data.json";
import { getProductContent } from "@/features/open-product-modal/ui/getProductContent";
import styles from "./page.module.scss";
import GoToMenuButton from "./GoToMenuButton";

export default async function ProductPage({ params }) {
  const { id } = await params;
console.log("id", id);

  const productIdNum = Number(id);

  let item = data.items?.find((p) => p.id === productIdNum);


  if (!item) {
    item = data.combo?.find((c) => c.id === productIdNum);
  }
  if (!item) {
    return <div>Товар не найден</div>;
  }
  console.log("item", item);
  return (
    <div className={styles.container}>
      <GoToMenuButton className={styles.arrow} />
      <div className={styles.content}>{getProductContent(item)}</div>
    </div>
  );
}
