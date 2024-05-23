import React from "react";
import { Typography } from "antd";

import FeedbackComplete from "../../assets/Images/feedbackComplete.svg";

import style from "./TestComplete.module.scss";

import messages from "../../constants/messages";
import DataBar from "../../components/dataBar/dataBar";

const { Paragraph } = Typography;

const {
  FEEDBACK: { FEEDBACKCOMPLETED, FEEDBACKNOTIFIED },
  ICON
} = messages;

const TestComplate = () => {
  return (
    <div className={style.container}>
      <div className={style.section1}>
        <img src={FeedbackComplete} alt={ICON} />
        <h1>{FEEDBACKCOMPLETED}</h1>
        <Paragraph>{FEEDBACKNOTIFIED}</Paragraph>
      </div>
    </div>
  );
};

export default React.memo(TestComplate);
