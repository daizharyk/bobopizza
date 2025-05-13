import NewsSlider from "@/components/NewsSlider/NewsSlider";
import PopularOrders from "@/components/PopularOrders/PopularOrders";
import ProductListSection from "@/components/ProductListSection/ProductListSection";
import Label from "@/components/svg/WithoutPigLabel";
import data from "@/data/data.json";

const sections = [
  { key: "pizza", title: "Пиццы" },
  { key: "snacks", title: "Закуски" },
  { key: "cocktails", title: "Коктейли" },
  { key: "coffee", title: "Кофе" },
];

export default function Home() {
  return (
    <>
      <NewsSlider />
      <PopularOrders />
      <Label />
      {sections.map(({ key, title }) => {
        const items = data[key];
        return Array.isArray(items) ? (
          <ProductListSection key={key} title={title} items={items} />
        ) : null;
      })}
    </>
  );
}
