"use client";
import styles from "./GoToButton.module.scss";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";
import { useRouter } from "next/navigation";

export default function GoToButton({ to, onClick, back }) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      router.push(to);
    } else if (back) {
      router.back();
    } else {
      router.push("/"); // дефолт — на главную
    }
  };

  return <ArrowLeft className={styles.arrow} onClick={handleClick} />;
}
