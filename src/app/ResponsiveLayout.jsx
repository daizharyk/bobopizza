"use client";

import CategoriesBar from "@/widgets/categories-bar/ui/CategoriesBar";
import NewsSlider from "@/components/NewsSlider/NewsSlider";
import PopularOrders from "@/components/PopularOrders/PopularOrders";
import { ModalProvider } from "./context/ModalContext";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import { CartProvider } from "./context/CartContext";

export default function ResponsiveLayout({ children }) {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return (
    <CartProvider>
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
    </CartProvider>
  );
}
