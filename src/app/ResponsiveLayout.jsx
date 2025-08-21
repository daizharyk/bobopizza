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
import ProductSectionsContainer from "@/features/product_sections/ui/ProductSectionsContainer";

export default function ResponsiveLayout({ children, modal }) {
  const pathname = usePathname();
  const hiddenRoutes = ["/cart"];

  const shouldHideLayout = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return (
    <CartProvider>
      {!shouldHideLayout && <Header />}
      <ModalProvider>
        {isMobile ? (
          <>
            {!shouldHideLayout && (
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
          <>
            <ProductSectionsContainer />
            {children}
            {modal}
          </>
        </main>
      </ModalProvider>
      {!shouldHideLayout && <Footer />}
    </CartProvider>
  );
}
