import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@ant-design/icons";

import styles from "./logo.module.scss";

import { ReactComponent as logo } from "../../assets/logo.svg";

import constants from "../../constants/constants";

const {
  ROUTE: { LANDING_PAGE }
} = constants;
const Logo = () => {
  const navigate = useNavigate();
  const goToHome = useCallback(() => {
    navigate(LANDING_PAGE);
  }, [navigate]);
  return <Icon component={logo} className={styles.logo} onClick={goToHome} />;
};
export default React.memo(Logo);
