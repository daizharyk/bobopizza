"use client";

import CategoriesBar from "@/widgets/categories-bar/ui/CategoriesBar";
import NewsSlider from "@/components/NewsSlider/NewsSlider";
import PopularOrders from "@/components/PopularOrders/PopularOrders";
import { ModalProvider } from "./context/ModalContext";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import { CartProvider } from "./context/CartContext";
import { usePathname } from "next/navigation";
import Header from "@/widgets/Header/ui/Header/Header";
import Footer from "@/components/footer/Footer";

export default function ResponsiveLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith("/cart");
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return (
    <CartProvider>
      {!hideHeaderFooter && <Header />}
      <ModalProvider>
        {isMobile ? (
          <>
            {!hideHeaderFooter && (
              <>
                <NewsSlider />
                <PopularOrders />
                <CategoriesBar />
              </>
            )}
          </>
        ) : (
          <>
            <CategoriesBar />
            <NewsSlider />
            <PopularOrders />
          </>
        )}
        <main className="container">
          <>{children}</>
        </main>
      </ModalProvider>
      {!hideHeaderFooter && <Footer />}
    </CartProvider>
  );
}
