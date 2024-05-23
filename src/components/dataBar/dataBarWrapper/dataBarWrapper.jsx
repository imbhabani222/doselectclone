import React from "react";
import PropTypes from "prop-types";
import { Image, Typography } from "antd";

import styles from "../dataBar.module.scss";

import constants from "../../../constants/constants";
import ProgressBarWrapper from "../progressBarWrapper/progressBarWrapper";

const { Text } = Typography;
const { PROGRESSBAR_KEY } = constants;
const DataBarWrapper = ({ title, subTitle, image, alt, values, type }) => {
  const loadTitle = (title) => {
    return (
      <Text className={styles.databar_title} ellipsis={{ tooltip: title }}>
        {title}
      </Text>
    );
  };
  const content = (title, subTitle) => {
    return (
      <div className={styles.databar_wrapper}>
        {loadTitle(title)}
        <div className={styles.databar_subtitle}>{subTitle}</div>
      </div>
    );
  };
  return (
    <div className={styles.databar_wrapper_container}>
      {type === PROGRESSBAR_KEY ? (
        <ProgressBarWrapper />
      ) : (
        <>
          <Image className={styles.responsive_img} src={image} alt={alt} preview={false} />
          {values && (
            <div className={styles.calendar_double_line}>
              {values.map(({ title, subtitle }) => content(title, subtitle))}
            </div>
          )}
          {!values && content(title, subTitle)}
        </>
      )}
    </div>
  );
};

DataBarWrapper.propTypes = {
  title: [PropTypes.string, PropTypes.instanceOf(Element)],
  subTitle: PropTypes.string,
  type: PropTypes.any,
  alt: PropTypes.string,
  image: PropTypes.any,
  values: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(DataBarWrapper);
