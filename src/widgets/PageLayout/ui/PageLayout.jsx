"use client";

import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import Header from "@/widgets/Header/ui/Header/Header";
import CategoriesBar from "@/widgets/categories-bar/ui/CategoriesBar";
import NewsSlider from "@/components/NewsSlider/NewsSlider";

import Footer from "@/components/footer/Footer";
import LoginModalWrapper from "@/features/authByPhone/ui/LoginModal";
import { Toaster } from "react-hot-toast";
import CartLoader from "@/components/CartLoadr";

const PageLayout = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <>
      <CartLoader />
      <LoginModalWrapper />
      {isMobile ? (
        <>
          <NewsSlider />
          <main className="container">{children}</main>
          <CategoriesBar />
        </>
      ) : (
        <>
          <CategoriesBar />
          <NewsSlider />
          <main className="container">{children}</main>
        </>
      )}

      <Footer />
      <div id="modal-root" />
    </>
  );
};

export default PageLayout;
