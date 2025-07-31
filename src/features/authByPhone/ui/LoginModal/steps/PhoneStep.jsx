"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./PhoneStep.module.scss";
import { useDispatch } from "react-redux";
import { IMaskInput } from "react-imask";
import { setPhone, setStep } from "@/features/authByPhone/model/slices/loginModalSlice";

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, control } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(setPhone(data.phone));
    dispatch(setStep("code"));
    console.log("Телефон:", data.phone);
  };

  return (
    <>
      <div className={styles.modal}>
        <h2 className={styles.title}>Укажите телефон</h2>
        <p>Сможете быстро оформлять заказы и использовать бонусы</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="phone">Номер телефона</label>

          <Controller
            name="phone"
            control={control}
            rules={{
              required: true,
              validate: (value) =>
                value && value.length === 18 && value.indexOf("_") === -1,
            }}
            render={({ field }) => (
              <IMaskInput
                id="phone"
                inputMode="tel"
                autoComplete="tel"
                {...field}
                mask="+{7} (000) 000-00-00"
                placeholder="+7 (___) ___-__-__"
              />
            )}
          />

          <button
            className={!formState.isValid ? styles.buttonDisabled : ""}
            type="submit"
            disabled={!formState.isValid}
          >
            Выслать код
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
