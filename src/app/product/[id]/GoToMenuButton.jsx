"use client";

import ArrowLeft from "@/components/svg/ArrowLeftSvg";
import { useRouter } from "next/navigation";

export default function GoToMenuButton({ className }) {
  const router = useRouter();

  return <ArrowLeft className={className} onClick={() => router.push("/")} />;
}
