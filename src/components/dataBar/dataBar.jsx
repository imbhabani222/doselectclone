import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import styles from "../dataBar/dataBar.module.scss";

import DataBarWrapper from "./dataBarWrapper/dataBarWrapper";
import constants from "../../constants/constants";

import { dataBarContent } from "../../data/data-bar";

const {
  ROUTE: {
    LANDING_PAGE,
    INSTRUCTION_PAGE,
    FEEDBACK,
    DOSELECT_INSTRUCTION,
    FAQ,
    TESTCOMPLETE,
    TEST_SECTION_SUBMIT
  }
} = constants;
const { Text } = Typography;

const DataBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ids, setIds] = useState([]);
  useEffect(() => {
    switch (location.pathname.toLocaleLowerCase()) {
      case LANDING_PAGE.toLocaleLowerCase():
        setIds([3]);
        break;
      case INSTRUCTION_PAGE.toLocaleLowerCase():
        setIds([1, 3]);
        break;
      case DOSELECT_INSTRUCTION.toLocaleLowerCase():
        setIds([1, 3]);
        break;
      case FEEDBACK.toLocaleLowerCase():
        setIds([1]);
        break;
      case FAQ.toLocaleLowerCase():
        setIds([4, 5]);
        break;
      case TESTCOMPLETE.toLocaleLowerCase():
        setIds([2]);
        break;
      case TEST_SECTION_SUBMIT.toLocaleLowerCase():
        setIds([2]);
        break;
      default:
        setIds([2, 3, 4, 5]);
    }
  }, [location]);
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const getBar = (layout) => {
    return (
      <>
        {layout?.data?.map(({ values, title, subtitle, image, alt, type }) => (
          <DataBarWrapper
            title={title}
            subTitle={subtitle}
            image={image}
            alt={alt}
            values={values}
            type={type}
          />
        ))}
      </>
    );
  };
  return (
    <div className={styles.container}>
      {dataBarContent
        ?.filter(({ id }) => (ids ? ids.includes(id) : true))
        .map((layout) => (
          <div className={clsx(styles.layout, { [styles.backGroundTypeTwo]: layout.title })}>
            {layout.actionButton && (
              <Button
                className={styles.databar_btn}
                shape="round"
                icon={<LeftOutlined />}
                onClick={goBack}
              >
                {layout.actionButton}
              </Button>
            )}
            {layout.alignLeft ? (
              <div className={styles.typeTwo}>
                <div className={styles.containerTwo}>
                  {layout.title && <Text className={styles.support_text}>{layout.title}</Text>}
                  <div className={styles.content}>{getBar(layout)}</div>
                </div>
              </div>
            ) : (
              getBar(layout)
            )}
          </div>
        ))}
    </div>
  );
};

export default React.memo(DataBar);
