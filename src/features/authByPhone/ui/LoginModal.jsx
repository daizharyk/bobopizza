import React from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import styles from "./LoginModal.module.scss";
import { useDispatch, useSelector } from "react-redux";

const LoginModal = ({ onClose }) => {
  const isOpen = useSelector((state) => state.loginModal.isOpen);
 console.log("LoginModal isOpen:", isOpen);
 
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Телефон:", data.phone);
  };

  return createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <h2>Укажите телефон</h2>
        <p>Сможете быстро оформлять заказы и использовать бонусы</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="tel"
            placeholder="Номер телефона"
            {...register("phone", { required: true })}
          />
          <button type="submit">Выслать код</button>
        </form>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default LoginModal;
