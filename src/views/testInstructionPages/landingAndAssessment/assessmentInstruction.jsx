import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import clsx from "clsx";

import User from "../../../assets/lady-img.svg";
import Bestwishes from "../../../assets/bestwishes.svg";
import BestwishesMobile from "../../../assets/best_wishes_mobile.svg";
import RightArrow from "../../../assets/right-arrow.svg";

import styles from "./instructionPageStyle.module.scss";

import instructionDetails from "../../../constants/instructionConstant";
import { assessmentInstructionTitleArray } from "../../../data/instructionData";
import constants from "../../../constants/constants";

const { Text } = Typography;
const { CONTINUE, ASSESSMENT_INSTRUCTION, ALT_IMG } = instructionDetails;
const {
  ROUTE: { DOSELECT_INSTRUCTION }
} = constants;

const AssessmentInstruction = () => {
  let navigate = useNavigate();
  const gotoDoSelectInformation = useCallback(() => {
    navigate(DOSELECT_INSTRUCTION);
  }, [navigate]);
  return (
    <div>
      <div className={styles.parent_div}>
        <div className={styles.instruction_main_div_wrapper}>
          <div className={styles.assessment_body}>
            <div className={styles.assessment_div}>
              <div className={styles.assessment_contents_image_mobile}>
                <img alt={ALT_IMG} className={styles.img_fluid} src={User} />
              </div>
              <Text className={styles.main_header_style}>{ASSESSMENT_INSTRUCTION}</Text>
            </div>
            <div className={styles.assessment_contents}>
              <div className={styles.assessment_contents_text}>
                {assessmentInstructionTitleArray.map((data, index) => (
                  <div key={index} className={styles.list_div}>
                    <div className={styles.ellipse}></div>
                    <div className={styles.ellipse_text}>{data.title}</div>
                  </div>
                ))}
              </div>
              <div className={styles.assessment_contents_image}>
                <img alt={ALT_IMG} className={styles.img_lady} src={User} />
              </div>
            </div>
          </div>
          <div className={styles.best_wishes_wrapper}>
            <img
              alt={ALT_IMG}
              className={clsx(styles.best_wishes_mobile, styles.img_fluid)}
              src={BestwishesMobile}
            />
            <img
              alt={ALT_IMG}
              className={clsx(styles.best_wishes, styles.img_fluid)}
              src={Bestwishes}
            />
            <div className={styles.assessment_btn}>
              <Button onClick={gotoDoSelectInformation} className={styles.btn_gray}>
                {CONTINUE} <img alt={ALT_IMG} src={RightArrow} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(AssessmentInstruction);
