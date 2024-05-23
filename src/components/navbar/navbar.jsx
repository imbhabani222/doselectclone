import React, { useCallback } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Icon from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import styles from "./navbar.module.scss";

import { ReactComponent as help } from "../../assets/help.svg";
import { ReactComponent as wifi } from "../../assets/wifi.svg";
import { ReactComponent as camera } from "../../assets/camera.svg";

import constants from "../../constants/constants";
import messages from "../../constants/messages";
import Logo from "../logo/logo";
import Timer from "../timer/timer";

const {
  HELP,
  QUESTION,
  LOGO_LABEL,
  TEXT_LABEL,
  TIME_LABEL: { H, M, S }
} = messages;

const {
  ROUTE: { FAQ, TEST_SECTION_SUBMIT }
} = constants;
const { Header } = Layout;
const Navbar = ({ network = true, que_label = true, video_camera = true, clock = true }) => {
  let navigate = useNavigate();
  const gotoFAQ = useCallback(() => {
    navigate(FAQ);
  }, [navigate]);
  const goToQuestionPage = useCallback(() => {
    navigate(TEST_SECTION_SUBMIT);
  }, [navigate]);
  return (
    <Header className={styles.site_page_header}>
      <Logo />
      {que_label && (
        <Button type={TEXT_LABEL} className={styles.que_label} onClick={goToQuestionPage}>
          {QUESTION}
        </Button>
      )}
      <div className={styles.content_div}>
        {clock && <Timer />}
        {video_camera && <Icon component={camera} className={styles.icon} />}
        {network && (
          <Icon
            component={wifi}
            className={clsx(
              styles.icon,
              { [styles.no_network]: false },
              { [styles.poor_network]: false }
            )}
          />
        )}
        <div className={styles.helpiconbtn} onClick={gotoFAQ}>
          <Icon component={help} className={styles.icon} />
          <Paragraph className={styles.text}>{HELP}</Paragraph>
        </div>
      </div>
    </Header>
  );
};
export default Navbar;
