import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "antd";
import clsx from "clsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import moment from "moment";

import rightArrow from "../../../assets/right-arrow.svg";
import leftArrow from "../../../assets/left-arrow.svg";

import styles from "./testQuestions.module.scss";

import instructionDetails from "../../../constants/instructionConstant";
import TableContainer from "../../../components/TableContainer/TableContainer";
import TestJson from "../../../data/testSectionWise.json";
import SectionWiseTestJson from "../../../data/testWithoutSectionWise.json";
import constants from "../../../constants/constants";
import { columnsData } from "./columnConfig";
import { systemActions } from "../../../actions/actions";
import { getSubmitConformationModal } from "../../../constants/modals";
import BreezeModal from "../../../components/modal/modal";
import timerData from "../../../data/counter.json";

const {
  ROUTE: { DOSELECT_INSTRUCTION, FEEDBACK }
} = constants;
const { Text } = Typography;

const { ALT_IMG, BACK_TO_INSTR, FINISH_AND_SUBMIT, SUBMIT_AND_NEXT, ROW_KEY } = instructionDetails;

const TestQuestionsPage = () => {
  const { timeLeft } = timerData;
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [questionsArray, setQuestionsArray] = useState(TestJson);
  const [questionWithoutSectionsArray, setWithoutSectionsArray] = useState(SectionWiseTestJson);
  const [toggleArrayData, setToggle] = useState(false);

  const onSubmit = useCallback(() => {
    setVisible(true);
  }, []);

  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);
  const gotoDoSelectInformation = useCallback(() => {
    navigate(DOSELECT_INSTRUCTION);
  }, [navigate]);

  const navigateToFeedBack = useCallback(() => {
    navigate(FEEDBACK);
  }, [navigate]);
  const onSubmitNext = () => {};
  const systemActionReducer = useSelector(
    (state) => state.appReducer && state.appReducer.actionReducer,
    shallowEqual
  );
  useEffect(() => {
    dispatch(systemActions({ timeLeft: moment().add(timeLeft, "seconds").valueOf() }));
  }, [dispatch, timeLeft]);

  const data = getSubmitConformationModal({
    onOk: navigateToFeedBack,
    onCancel,
    timeLeft: systemActionReducer.timeLeft
  });
  return (
    <div className={styles.parent_div}>
      <div className={styles.test_questions_wrapper}>
        <BreezeModal modalData={data} visible={visible} />
        {toggleArrayData ? (
          <div className={styles.main_table_header}>
            <TableContainer
              classData={styles.table_style}
              bordered={false}
              rowKey={ROW_KEY}
              scroll={{ x: 700 }}
              data={questionWithoutSectionsArray.data}
              columnsData={columnsData}
              pagination={false}
            />
            <div className={styles.questions_btn_div}>
              <div>
                <Button onClick={gotoDoSelectInformation} className={styles.back_to_instr_btn}>
                  <img alt={ALT_IMG} src={leftArrow} /> {BACK_TO_INSTR}
                </Button>
                <Button onClick={onSubmit} className={styles.finish_btn}>
                  {FINISH_AND_SUBMIT}
                  <img alt={ALT_IMG} src={rightArrow} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          questionsArray?.data?.map((data, index) => {
            return (
              <div key={`${index}q`} className={styles.main_table_header}>
                <div className={data.questionsDescStatus ? styles.disable_test : null} key={index}>
                  <div className={styles.main_div_clipath}>
                    <div className={styles.triangle_div}></div>
                    <Text className={styles.questions_desc}>{data.questionsDesc}</Text>
                  </div>
                  <TableContainer
                    classData={styles.table_style}
                    bordered={false}
                    rowKey={ROW_KEY}
                    scroll={{ x: 700 }}
                    data={data.questionsArray}
                    columnsData={columnsData}
                    pagination={false}
                  />
                  <div className={clsx(styles.questions_btn_div, styles.loop_btn)}>
                    {index + 1 === questionsArray.data.length ? (
                      <div>
                        <Button
                          onClick={gotoDoSelectInformation}
                          className={styles.back_to_instr_btn}
                        >
                          <img alt={ALT_IMG} src={leftArrow} /> {BACK_TO_INSTR}
                        </Button>
                        <Button onClick={onSubmit} className={styles.finish_btn}>
                          {FINISH_AND_SUBMIT}
                          <img alt={ALT_IMG} src={rightArrow} />
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={onSubmitNext} className={styles.submit_next}>
                        {SUBMIT_AND_NEXT}
                        <img alt={ALT_IMG} src={rightArrow} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default React.memo(TestQuestionsPage);
