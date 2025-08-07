"use client";

import CategoriesBar from "@/components/CategoriesBar/CategoriesBar";
import NewsSlider from "@/components/NewsSlider/NewsSlider";
import PopularOrders from "@/components/PopularOrders/PopularOrders";
import { ModalProvider } from "./context/ModalContext";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";

export default function ResponsiveLayout({ children }) {
  const isMobile = useIsMobile();
  return (
    <ModalProvider>
      {isMobile ? (
        <>
          <NewsSlider />
          <PopularOrders />
          <CategoriesBar />
        </>
      ) : (
        <>
          <CategoriesBar />
          <NewsSlider />
          <PopularOrders />
        </>
      )}
      <div className="container">
        <main>{children}</main>
      </div>
    </ModalProvider>
  );
}
