import "../styles/global.scss";

import { ReduxProvider } from "./providers";
import { Toaster } from "react-hot-toast";
import CartLoader from "@/components/CartLoadr";
import LoginModalWrapper from "@/features/authByPhone/ui/LoginModal";

import ResponsiveLayout from "./ResponsiveLayout";
import { siteCongfig } from "@/config/site.config";

export const metadata = {
  title: siteCongfig.title,
  description: siteCongfig.description,
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ReduxProvider>
          <CartLoader />
          <LoginModalWrapper />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "popup",
              duration: 2500,
            }}
          />
          <ResponsiveLayout>
            {children}
            {modal}
          </ResponsiveLayout>
          <div id="modal-root" />
        </ReduxProvider>
      </body>
    </html>
  );
}
