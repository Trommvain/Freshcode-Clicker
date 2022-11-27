import React, { useState, useEffect } from "react";
import styles from "./Clicker.module.scss";

const Clicker = () => {
  const [click, setClick] = useState(0);
  const [isIncrementClicker, setIsIncrementClicker] = useState(true);
  const [step, setStep] = useState(1);
  const [inputStep, setInputStep] = useState("");
  const [stepInputErr, setStepInputErr] = useState(" ");
  const [autoClickFreq, setAutoClickFreq] = useState(60);
  const [inputFreq, setInputFreq] = useState("");
  const [freqInputErr, setFreqInputErr] = useState(" ");
  const [isAutoClickStarted, setIsAutoClickStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    runAutoClick();

    return function cleanup() {
      stopAutoClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeClickerStep = () => {
    isIncrementClicker ? setClick(click + step) : setClick(click - step);
  };

  const resetClicker = () => {
    if (isAutoClickStarted) {
      stopAutoClick();
    }
    setClick(0);
  };

  const setMode = (e) => {
    e.target.name === "increment"
      ? setIsIncrementClicker(true)
      : setIsIncrementClicker(false);
  };

  const incrementStep = () => {
    setStep(step + 1);
    setInputStep("");
  };

  const decrementStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
    setInputStep("");
  };

  const handleChange = (e) => {
    const {
      target: { value, name },
    } = e;

    if (name === "setStep") {
      if (Number.isInteger(+value)) {
        setInputStep(+value);
        setStep(+value);
        setStepInputErr(" ");
        if (+value === 0) {
          setStep(1);
          setInputStep("");
        }
      } else {
        setStepInputErr("Нужно вводить число!");
      }
    } else {
      if (Number.isInteger(+value)) {
        setInputFreq(+value);
        setAutoClickFreq(+value);
        setFreqInputErr(" ");
        if (+value === 0) {
          setAutoClickFreq(1);
          setInputFreq("");
        }
      } else {
        setFreqInputErr("Нужно вводить число!");
      }
    }
  };

  const runAutoClick = () => {
    if (!isAutoClickStarted) {
      setIsAutoClickStarted(true);
      const intervalId = setInterval(tick, (60 / autoClickFreq) * 1000);
      setIntervalId(intervalId);
    }
  };

  const stopAutoClick = () => {
    clearInterval(intervalId);
    setIsAutoClickStarted(false);
  };

  const tick = () => {
    isIncrementClicker
      ? setClick((oldClick) => oldClick + step)
      : setClick((oldClick) => oldClick - step);
  };

  const resetSettings = () => {
    setIsIncrementClicker(true);
    setStep(1);
    setInputStep("");
    setInputFreq("");
    setAutoClickFreq(60);
  };

  const activeModeBtnStyle = {
    backgroundColor: "#ff9fef",
    pointerEvents: "none",
  };

  return (
    <main className={styles.container}>
      <section className={styles.mainWindow}>
        <p>Клики: {click}</p>
        <button
          className={styles.clickBtn}
          onClick={isAutoClickStarted ? stopAutoClick : makeClickerStep}
        >
          {isIncrementClicker ? "Добавить" : "Отнять"}
        </button>
        <button className={styles.resetBtn} onClick={resetClicker}>
          Сбросить
        </button>
      </section>
      <section className={styles.setModeBlock}>
        <p>Режим кликера</p>
        <button
          className={styles.modeBtn}
          name="increment"
          style={isIncrementClicker ? activeModeBtnStyle : {}}
          onClick={setMode}
          disabled={isAutoClickStarted}
        >
          Добавлять шаг
        </button>
        <button
          className={styles.modeBtn}
          name="decrement"
          style={isIncrementClicker ? {} : activeModeBtnStyle}
          onClick={setMode}
          disabled={isAutoClickStarted}
        >
          Отнимать шаг
        </button>
      </section>
      <section className={styles.setStepBlock}>
        <p className={styles.stepTitle}>Шаг = {step}</p>
        <p>Изменить шаг</p>
        <button
          className={styles.stepBtnPlus}
          onClick={incrementStep}
          disabled={isAutoClickStarted}
        >
          &#43;
        </button>
        <button
          className={styles.stepBtnMinus}
          onClick={decrementStep}
          disabled={isAutoClickStarted}
        >
          &#8722;
        </button>
        <input
          className={styles.input}
          placeholder="Задать шаг"
          type="text"
          name="setStep"
          value={inputStep}
          onChange={handleChange}
          onBlur={() => setStepInputErr(" ")}
          disabled={isAutoClickStarted}
        />
        <p className={styles.inputErr}>{stepInputErr}</p>
      </section>
      <section className={styles.autoClickBlock}>
        <button
          className={
            isAutoClickStarted ? styles.autoClickBtnActive : styles.autoClickBtn
          }
          onClick={isAutoClickStarted ? stopAutoClick : runAutoClick}
        >
          АвтоКлик
        </button>
        <p>Частота</p>
        <p>{autoClickFreq} раз/мин</p>
        <input
          className={styles.input}
          placeholder="Задать частоту"
          type="text"
          name="setFrequency"
          value={inputFreq}
          onChange={handleChange}
          onBlur={() => setFreqInputErr(" ")}
          disabled={isAutoClickStarted}
        />
        <p className={styles.inputErr}>{freqInputErr}</p>
      </section>
      <button
        className={styles.resetSettingsBtn}
        disabled={isAutoClickStarted}
        onClick={resetSettings}
      >
        Сбросить настройки
      </button>
    </main>
  );
};

export default Clicker;
