import data from "@/data/data.json";
import { getProductContent } from "@/features/open-product-modal/ui/getProductContent";
import styles from "./page.module.scss";
import GoToMenuButton from "@/shared/ui/GoToButton/GoToButton";
import MobileProductSheet from "@/features/mobile_product_sheet/ui/MobileProductSheet";

export default async function ProductModalPage({ params }) {
  const { id } = await params;

  const productIdNum = Number(id);

  let item = data.items?.find((p) => p.id === productIdNum);

  if (!item) {
    const comboItem = data.combo?.find((c) => c.id === productIdNum);
    if (comboItem) {
      item = { ...comboItem, type: "combo" };
    }
  }

  if (!item) {
    return <div>Товар не найден</div>;
  }
  

  return (
    <MobileProductSheet>
      <div className={styles.container}>
        <GoToMenuButton className={styles.button} />
        <div className={styles.content}>{getProductContent(item)}</div>
      </div>
    </MobileProductSheet>
  );
}
