import Image from "next/image";
import styles from "./PizzaExtrasSelector.module.scss";
import SelectedSvg from "../svg/ModalSvg/SelectedSvg";

// components/PizzaExtrasSelector.jsx
const PizzaExtrasSelector = ({
  pizzaExtras,
  selectedExtras,
  toggleExtra,
  variant = "combo",
}) => {
  

  return (
    <div className={styles.extra_content}>
      <h3>Добавить по вкусу</h3>
      <section
        className={`${styles.extras_content} ${
          variant === "combo" ? styles.combo : styles.pizza
        }`}
      >
        {pizzaExtras.map((item) => {
          const isSelected = selectedExtras.includes(item.id);
          return (
            <button
              key={item.id}
              className={`${styles.article} ${
                isSelected ? styles.selected : ""
              }`}
              onClick={() => toggleExtra(item.id)}
            >
              {isSelected && (
                <div className={styles.selectedIcon}>
                  <SelectedSvg />
                </div>
              )}
              <Image src={item.image} alt={item.title} width={88} height={88} />
              <h4 className={styles.title}>{item.title}</h4>
              <p className={styles.price}>{item.price}тг.</p>
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default PizzaExtrasSelector;
