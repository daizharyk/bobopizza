"use client";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;
  
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};
export default Header;
