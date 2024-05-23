import { Collapse, Typography } from "antd";
import React from "react";
import PropTypes from "prop-types";

import styles from "./CardCollapse.module.scss";

import messages from "../../constants/messages";

const { Panel } = Collapse;
const { Paragraph } = Typography;

const { RIGHT } = messages;
const CardCollapse = ({ question, answer, index }) => {
  return (
    <Collapse
      key={index}
      expandIconPosition={RIGHT}
      defaultActiveKey={["1"]}
      ghost
      className={styles.card}
    >
      <Panel header={question} key={index} className={styles.panel}>
        <Paragraph className={styles.answer}>{answer}</Paragraph>
      </Panel>
    </Collapse>
  );
};

CardCollapse.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  index: PropTypes.number
};

export default React.memo(CardCollapse);
