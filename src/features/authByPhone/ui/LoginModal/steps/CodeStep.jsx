import { useDispatch, useSelector } from "react-redux";
import styles from "./CodeStep.module.scss";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { setStep } from "@/features/authByPhone/model/slices/loginModalSlice";

const CodeStep = () => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const phone = useSelector((state) => state.loginModal.phone);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const dispatch = useDispatch();
  const { formState } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Введите код</h3>
      <div className={styles.description}>
        <p>Из СМС на {phone} </p>
        <button
          className={styles.changeNumber}
          onClick={() => dispatch(setStep("phone"))}
        >
          изменить
        </button>
      </div>

      <div className={styles.codeInput}>
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            inputMode="numeric"
            ref={inputRefs[i]}
            onChange={(e) => {
              if (e.target.value.length === 1 && i < 3) {
                inputRefs[i + 1].current.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !e.target.value && i > 0) {
                inputRefs[i - 1].current.focus();
              }
            }}
            className={styles.input}
          />
        ))}
      </div>

      <p>{canResend && `Получить новый код через ${secondsLeft} секунд`} </p>
      <button
        className={`${styles.submitButton} ${
          !formState.isValid ? styles.buttonDisabled : ""
        }`}
        type="submit"
        disabled={!canResend}
      >
        Получить новый код
      </button>
    </div>
  );
};

export default CodeStep;
