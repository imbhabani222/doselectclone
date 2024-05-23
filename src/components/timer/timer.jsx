import React, { useEffect, useState } from "react";
import Icon from "@ant-design/icons";
import { shallowEqual, useSelector } from "react-redux";
import clsx from "clsx";
import { Typography } from "antd";

import styles from "./timer.module.scss";

import { ReactComponent as timer } from "../../assets/clock.svg";

import { getDuration, getTimeDiff, stringFiller } from "../../data/utils";
import Data from "../../data/counter.json";

import messages from "../../constants/messages";

const { TIME_LABEL_TWO } = messages;
const { Paragraph } = Typography;
const { showWarningAtSec } = Data;

const Timer = () => {
  const initialTime = {
    hours: "00",
    minutes: "00",
    seconds: "00"
  };
  const [timerString, setTimer] = useState(stringFiller(TIME_LABEL_TWO, initialTime));
  const [showWarning, setWarning] = useState(false);

  const systemActionReducer = useSelector(
    (state) => state.appReducer && state.appReducer.actionReducer,
    shallowEqual
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = getTimeDiff(systemActionReducer.timeLeft);
      setTimer(stringFiller(TIME_LABEL_TWO, getDuration(timeLeft, true)));
      if (timeLeft <= 0) {
        setTimer(stringFiller(TIME_LABEL_TWO, initialTime));
        clearInterval(interval);
      }
      if (timeLeft <= showWarningAtSec) {
        setWarning(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [systemActionReducer]);

  return (
    <div className={clsx(styles.container, { [styles.warning_mode]: showWarning })}>
      <Icon component={timer} className={styles.clock} />
      <Paragraph className={styles.counter}>{timerString}</Paragraph>
    </div>
  );
};
export default React.memo(Timer);
