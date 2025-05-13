import "../styles/global.scss";
import Header from "../components/Header/Header";
export const metadata = {
  title: "DodoPizza Clone",
  description: "Клон сайта DodoPizza - заказать пиццу онлайн",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
