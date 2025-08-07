import "../styles/global.scss";

import Footer from "@/components/footer/Footer";
import { ReduxProvider } from "./providers";
import { Toaster } from "react-hot-toast";
import CartLoader from "@/components/CartLoadr";
import LoginModalWrapper from "@/features/authByPhone/ui/LoginModal";
import Header from "@/widgets/Header/ui/Header/Header";
import ResponsiveLayout from "./ResponsiveLayout";

export const metadata = {
  title: "DodoPizza Clone",
  description: "Клон сайта DodoPizza - заказать пиццу онлайн",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ReduxProvider>
          <CartLoader />
          <Header />
          <LoginModalWrapper />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "popup",
              duration: 2500,
            }}
          />
          <ResponsiveLayout>{children}</ResponsiveLayout>
          <Footer />
          <div id="modal-root" />
        </ReduxProvider>
      </body>
    </html>
  );
}
