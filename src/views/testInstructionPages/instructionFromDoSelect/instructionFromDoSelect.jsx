import React, { useState, useCallback, useRef, useEffect } from "react";
import { Steps, Button } from "antd";
import { useNavigate } from "react-router-dom";

import rightArrow from "../../../assets/right-arrow.svg";
import leftArrow from "../../../assets/left-arrow.svg";

import styles from "../landingAndAssessment/instructionPageStyle.module.scss";

import instructionDetails from "../../../constants/instructionConstant";
import constants from "../../../constants/constants";
import { steps } from "./stepConfig";

const {
  ROUTE: { TEST_SECTION_SUBMIT, INSTRUCTION_PAGE }
} = constants;

const { CONTINUE, INSTRUCTION_DOSELECT, BACK, AGREE_AND_CONT, ALT_IMG } = instructionDetails;

const InstructionFromDoSelect = () => {
  const scrollToTopRef = useRef();
  let navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const { Step } = Steps;

  const next = useCallback(() => {
    setCurrent(current + 1);
  }, [current]);

  const prev = useCallback(() => {
    setCurrent(current - 1);
  }, [current]);
  const backToAssessmentInstruction = useCallback(() => {
    navigate(INSTRUCTION_PAGE);
  }, [navigate]);
  const goToQuestionsPage = useCallback(() => {
    navigate(TEST_SECTION_SUBMIT);
  }, [navigate]);

  const getStepSubHeaderText = useCallback(() => {
    return steps[current].subTitle;
  }, [current]);

  return (
    <>
      <div className={styles.parent_div}>
        <div className={styles.form_doselect_wrapper}>
          <div className={styles.common_div}>
            <div className={styles.instruction_doselect_maindiv}>
              <div className={styles.instruction_header}>{INSTRUCTION_DOSELECT}</div>
              <div className={styles.steps_div}>
                <div className={styles.responsive_steps}>
                  <Steps responsive={false} current={current}>
                    {steps.map((item) => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>
                </div>
              </div>
              <div className={styles.steps_sub_heaader_div}>{getStepSubHeaderText()}</div>
              <div className={styles.steps_content}>{steps[current].content}</div>
              <div className={styles.line}></div>
              <div className={styles.steps_btn_div}>
                {current < 1 ? (
                  <Button onClick={backToAssessmentInstruction} className={styles.btn_normal}>
                    <img alt={ALT_IMG} src={leftArrow} /> {BACK}
                  </Button>
                ) : (
                  <Button onClick={() => prev()} className={styles.btn_normal}>
                    <img alt={ALT_IMG} src={leftArrow} /> {BACK}
                  </Button>
                )}

                {current >= 2 ? (
                  <Button onClick={goToQuestionsPage} className={styles.btn_gray}>
                    {AGREE_AND_CONT}
                    <img alt={ALT_IMG} src={rightArrow} />
                  </Button>
                ) : (
                  <Button onClick={() => next()} className={styles.btn_gray}>
                    {CONTINUE}
                    <img alt={ALT_IMG} src={rightArrow} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(InstructionFromDoSelect);
