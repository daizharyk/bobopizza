"use client";
import { useDispatch } from "react-redux";
import styles from "./ProductCard.module.scss";
import { addItemToCart } from "../../../components/utils/addItemToCart";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import DiscountSvg from "../../../components/svg/DiscountSvg";
import { useRouter } from "next/navigation";
import { useScrollRestoration } from "@/shared/lib/hooks/useScrollRestoration";

const { default: Image } = require("next/image");

const ProductCard = ({ item, onOpenModal, allItems = [] }) => {
  const dispatch = useDispatch();
  const router = useRouter();
 
 
  
  const saveScroll = useScrollRestoration();
  const isMobile = useIsMobile();
  if (isMobile === null) return null;

  const calculateComboPrice = (item, allItems) => {
    if (!Array.isArray(item.items)) return { original: 0, discounted: 0 };

    let total = 0;

    for (const comboItem of item.items) {
      const product = allItems.find((p) => p.id === comboItem.defaultId);
      if (!product) continue;

      let price = 0;

      if (
        comboItem.preferredSize &&
        product.variants &&
        product.variants.length > 0
      ) {
        const matchedVariant = product.variants.find(
          (variant) => variant.size === comboItem.preferredSize
        );
        price = matchedVariant?.price || 0;
      } else {
        price = product.variants?.[0]?.price || product.price || 0;
      }

      total += price;
    }

    // Цена без скидки
    const originalPrice = total;

    // Цена со скидкой и округлением на …90
    let discountedPrice = total * 0.8;
    discountedPrice = Math.ceil(discountedPrice / 100) * 100 - 10;

    return {
      original: originalPrice,
      discounted: discountedPrice,
    };
  };

  // Использование
  const isCombo = Array.isArray(item.items);
  const comboPrice = isCombo ? calculateComboPrice(item, allItems) : null;

  const handleCardClick = () => {
      saveScroll(); 
    if (isMobile) {
      router.push(`/product/${item.id}`, { shallow: true });
    } else {
      onOpenModal(item);
    }
  };

  function getMinVariantPrice(item) {
    if (!item?.variants || item.variants.length === 0) {
      return "Собрать";
    }

    if (item.variants.length === 1) {
      return `${Number(item.variants[0].price).toLocaleString("ru-RU")} тг.`;
    }

    const minPrice = Math.min(...item.variants.map((v) => Number(v.price)));
    return `от ${minPrice.toLocaleString("ru-RU")} тг.`;
  }

  const handleAddToCart = () => {
    if (item.customizable) {
      handleCardClick();
    } else {
      addItemToCart(dispatch, item);
    }
  };

  return (
    <article className={styles.article}>
      <Image
        className={styles.image}
        src={item.image}
        alt={item.title}
        width={280}
        height={280}
        onClick={handleCardClick}
      />
      <div className={styles.info}>
        <h3>{item.title}</h3>
        <p className={styles.description}>{item.ingredients}</p>
        <div className={styles.price_wrapper}>
          {!isMobile && (
            <div className={styles.priceWrapper}>
              {" "}
              <div className={styles.price}>
                {isCombo
                  ? `${comboPrice.discounted.toLocaleString("ru-RU")} тг.`
                  : getMinVariantPrice(item) || "Цена не указана"}
              </div>
              {isCombo && (
                <div className={styles.discountPrice}>
                  <DiscountSvg className={styles.discountSvg} />
                  <div className={styles.discountPriceText}>
                    {comboPrice.original.toLocaleString("ru-RU")} тг.
                  </div>
                </div>
              )}
            </div>
          )}

          <button className={styles.addToCardButton} onClick={handleAddToCart}>
            {isMobile
              ? isCombo
                ? `от ${comboPrice.discounted.toLocaleString("ru-RU")} тг.`
                : getMinVariantPrice(item)
              : item.variants?.length > 1
              ? "Выбрать"
              : "В корзину"}
          </button>
          {isMobile && isCombo && (
            <div className={styles.discountPrice}>
              <DiscountSvg className={styles.discountSvg} />
              <div className={styles.discountPriceText}>
                {comboPrice.original.toLocaleString("ru-RU")} тг.
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
