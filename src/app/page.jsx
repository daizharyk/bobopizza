import DeliveryInfo from "@/components/Delivery Info/DeliveryInfo";
import NewsSlider from "@/components/NewsSlider/NewsSlider";
import PopularOrders from "@/components/PopularOrders/PopularOrders";
import ProductListSection from "@/components/ProductListSection/ProductListSection";
import Label from "@/components/svg/WithoutPigLabel";
import data from "@/data/data.json";

export default function Home() {
  return (
    <>
      <NewsSlider />
      <PopularOrders />
      <Label />
      {data.categories.map(({ label, targetId }) => {
        const items = data[targetId];
        return Array.isArray(items) ? (
          <ProductListSection
            key={targetId}
            id={targetId}
            title={label}
            items={items}
          />
        ) : null;
      })}
      <DeliveryInfo />
    </>
  );
}
