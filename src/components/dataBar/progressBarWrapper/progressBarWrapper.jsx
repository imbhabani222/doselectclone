import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Progress, Typography } from "antd";

import styles from "../dataBar.module.scss";
import colorVars from "../../../commonStyles/color.module.scss";

import messages from "../../../constants/messages";
import { dataBarData } from "../../../data/data-bar";
import { stringFiller } from "../../../data/utils";

const { Text } = Typography;
const { PROGRESS_DATABAR_TEXT } = messages;

const ProgressBarWrapper = () => {
  const { completed, total } = dataBarData;
  const [percent, setPercent] = useState(parseInt((completed / total) * 100));
  useEffect(() => {
    setPercent(parseInt((completed / total) * 100));
  }, [completed, total]);
  const getText = () => {
    return stringFiller(PROGRESS_DATABAR_TEXT, { completed, total });
  };
  return (
    <div className={styles.progressbar_col}>
      <Progress
        percent={percent}
        strokeWidth={styles.progress_stroke_width}
        strokeColor={colorVars.progress_stroke_color}
        trailColor={colorVars.progress_unfilled_color}
        showInfo={false}
        className={styles.progress}
      />
      <Text className={styles.progressbar_text}>{getText()}</Text>
    </div>
  );
};

ProgressBarWrapper.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};

export default React.memo(ProgressBarWrapper);
