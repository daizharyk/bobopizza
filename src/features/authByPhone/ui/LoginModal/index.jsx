"use client";
import styles from "./index.module.scss";
import PhoneStep from "./steps/PhoneStep";
import CodeStep from "./steps/CodeStep";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { closeLoginModal } from "../../model/slices/loginModalSlice";
import { CartCloseSVG } from "@/components/svg/CartCloseSVG";

const LoginModalWrapper = () => {
  const isOpen = useSelector((state) => state.loginModal.isOpen);

  const step = useSelector((state) => state.loginModal.step);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeLoginModal());
  };

  if (!isOpen) return null;
  return createPortal(
    <div className={styles.modalOverlay} onClick={handleClick}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
        {step === "phone" && <PhoneStep />}
        {step === "code" && <CodeStep />}
        <button onClick={handleClick} className={styles.closeButton}>
          <CartCloseSVG />
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default LoginModalWrapper;
