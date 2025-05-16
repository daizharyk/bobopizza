"use client";

import Image from "next/image";
import styles from "./DeliveryInfo.module.scss";
import { useEffect, useState } from "react";

const DeliveryInfo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (!isPopupOpen) return;

    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    script.type = "text/javascript";
    script.onload = () => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map("map", {
          center: [55.76, 37.64], // замени на свои координаты
          zoom: 10,
          controls: ["zoomControl"],
        });

        // Удалим лишние контролы
        map.controls.remove("trafficControl");
        map.controls.remove("geolocationControl");
        map.controls.remove("searchControl");
        map.controls.remove("typeSelector");
        map.controls.remove("fullscreenControl");
        map.controls.remove("rulerControl");

        const placemark = new window.ymaps.Placemark([55.76, 37.64], {
          balloonContent: "Зона доставки",
        });
        map.geoObjects.add(placemark);
      });
    };
    document.body.appendChild(script);
  }, [isPopupOpen]);

  return (
    <section className={styles.container}>
      <h2>Доставка и оплата</h2>
      <div className={styles.wrapper}>
        <div className={styles.deliveryItem}>
          <h3>60 МИНУТ ИЛИ ПИЦЦА БЕСПЛАТНО</h3>
          <p>
            Если мы не успеем доставить любые продукты, кроме сувениров и
            соусов, за 60 минут, вы получите извинительную пиццу. Её можно будет
            добавить в один из следующих заказов.
          </p>
        </div>
        <div className={styles.deliveryItem}>
          <h3>от 3 500 ТГ.</h3>
          <p>Минимальная сумма доставки</p>
          <h3>25 000 ТГ.</h3>
          <p>Максимальная сумма при оплате наличными</p>
          <p>Изображения продуктов могут отличаться от продуктов в заказе.</p>
        </div>

        <div className={styles.deliveryItem}>
          <h3>ЗОНА ДОСТАВКИ ОГРАНИЧЕНА</h3>
          <div
            onClick={() => setIsPopupOpen(true)}
            id="yandex-map"
            className={styles.map}
          >
            <div className={styles.text}>Зона доставки</div>
            <Image
              src={"/png/map.jpg"}
              width={281}
              height={290}
              alt="Preivew map"
            />
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div
          className={styles.popupOverlay}
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setIsPopupOpen(false)}
            >
              ×
            </button>
            <div
              className={styles.mapp}
              id="map"
              style={{ width: "100%", height: "600px" }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DeliveryInfo;
