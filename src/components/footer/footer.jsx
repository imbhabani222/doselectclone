import React from "react";
import { Typography } from "antd";

import styles from "./footer.module.scss";

import messages from "../../constants/messages";

const { Paragraph } = Typography;

const { DO_SELECT_RESEVE_RIGHTS } = messages;

const Footer = () => {
  let day = new Date().getFullYear();

  return (
    <div className={styles.footercl}>
      <Paragraph className={styles.footer_text}>
        &copy; {`${day} ${DO_SELECT_RESEVE_RIGHTS}`}
      </Paragraph>
    </div>
  );
};

export default Footer;
