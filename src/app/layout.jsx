import "../styles/global.scss";
import Header from "../components/Header/Header";
import Footer from "@/components/footer/Footer";
import CategoriesBar from "@/components/CategoriesBar/CategoriesBar";
import Cart from "@/components/cart/Cart";

export const metadata = {
  title: "DodoPizza Clone",
  description: "Клон сайта DodoPizza - заказать пиццу онлайн",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <CategoriesBar />
        <div className="container">
          <main>{children}</main>
        </div>

        <Footer />
        <div id="modal-root" />
      </body>
    </html>
  );
}
