"use client";

import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import CartButtonDesktop from "./CartButtonDesktop";
import CartButtonMobile from "./CartButtonMobile";

export default function CartButton() {
  const isMobile = useIsMobile();
 
  return isMobile ? <CartButtonMobile /> : <CartButtonDesktop />;
}
