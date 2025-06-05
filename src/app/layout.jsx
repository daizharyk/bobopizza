import "../styles/global.scss";
import Header from "../components/Header/Header";
import Footer from "@/components/footer/Footer";
import CategoriesBar from "@/components/CategoriesBar/CategoriesBar";
import { ReduxProvider } from "./providers";
import NewsSlider from "@/components/NewsSlider/NewsSlider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DodoPizza Clone",
  description: "Клон сайта DodoPizza - заказать пиццу онлайн",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>
          <Header />
          <CategoriesBar />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "popup",
              duration: 2500,
            }}
          />
          <NewsSlider />
          <div className="container">
            <main>{children}</main>
          </div>
          <Footer />
          <div id="modal-root" />
        </ReduxProvider>
      </body>
    </html>
  );
}
