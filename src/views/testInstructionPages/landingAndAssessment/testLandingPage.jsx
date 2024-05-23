import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Row, Col, Typography, Button } from "antd";
import clsx from "clsx";

import ladyImg from "../../../assets/lady-img.svg";
import rightArrow from "../../../assets/right-arrow.svg";

import styles from "./instructionPageStyle.module.scss";

import instructionDetails from "../../../constants/instructionConstant";
import constants from "../../../constants/constants";
import { landingPageArray, inputArray } from "../../../data/instructionData";

const { Text, Paragraph } = Typography;
const {
  FORM_LAYOUT,
  ALT_IMG,
  INSTRUCTION_DOSELECT,
  ENJOY_BEST_EXP,
  ASSESSMENT_INVITATION_SENT,
  USER_EMAIL,
  ENTER_DETAILS,
  T_AND_C,
  PROCEED,
  SAMPLE_ASSESSMENT,
  TO_TAKE_SAMPLE,
  CLICK_HERE,
  ASSESSMENT_RECOMMENDATION,
  NOTE,
  HTML_TYPE
} = instructionDetails;
const {
  ROUTE: { INSTRUCTION_PAGE }
} = constants;

const TestLandingPage = () => {
  const [formData, setFormData] = useState({});
  const [tandc, setTandC] = useState(false);
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onChangeCheck = useCallback((e) => {
    setTandC(e.target.checked);
  }, []);
  const goToInstructionPage = useCallback(() => {
    navigate(INSTRUCTION_PAGE);
  }, [navigate]);
  const onFinish = useCallback(
    (values) => {
      setFormData(values);
      if (values?.Email) {
        goToInstructionPage();
      }
    },
    [goToInstructionPage]
  );
  return (
    <div>
      <div className={styles.parent_div}>
        <div className={styles.testlanding_main_wrapper}>
          <div className={styles.testlanding_body_wrapper}>
            <div className={styles.main_container}>
              <div className={styles.insruction_div}>
                <div className={styles.lady_img_mobile}>
                  <img alt={ALT_IMG} className={styles.img_fluid} src={ladyImg} />
                </div>
                <Text className={styles.instruction_header}>{INSTRUCTION_DOSELECT}</Text>
              </div>
              <Row className={styles.body_div}>
                <Col xs={24} sm={24} md={14}>
                  <Text className={styles.common_text_header}>{ENJOY_BEST_EXP}</Text>
                  {landingPageArray.map((data, index) => {
                    return (
                      <div key={index}>
                        <Paragraph className={styles.landing_header_content}>
                          {data.headerName}
                        </Paragraph>
                        {data.array.map((nestedData, indexes) => {
                          return (
                            <div key={indexes} className={styles.flex_class_ellipse}>
                              <div className={styles.ellipse}></div>
                              <div className={clsx(styles.common_text_header, styles.ellipse_text)}>
                                {nestedData.title}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </Col>
                <Col xs={24} sm={24} md={10} className={styles.flex_class_img}>
                  <div className={styles.lady_img}>
                    <img alt={ALT_IMG} className={styles.img_fluid} src={ladyImg} />
                  </div>
                </Col>
              </Row>
              <div className={styles.card_style}>
                <div className={styles.card_body_wrapper}>
                  <Paragraph className={styles.instruction_card_header}>
                    {ASSESSMENT_INVITATION_SENT}
                  </Paragraph>
                  <Paragraph className={styles.instruction_card_email}>{USER_EMAIL}</Paragraph>
                  <Paragraph className={styles.instruction_nprmal_text}>{ENTER_DETAILS}</Paragraph>
                  <div className={clsx(styles.instruction_nprmal_text, styles.form_wrapper)}>
                    <Form form={form} layout={FORM_LAYOUT} onFinish={onFinish}>
                      {inputArray?.map((data, index) => {
                        return (
                          <Form.Item
                            key={index}
                            name={data.label}
                            label={data.label}
                            rules={[
                              {
                                type: data.inputType,
                                pattern: new RegExp(data.pattern),
                                message: data.message
                              },
                              { required: true }
                            ]}
                          >
                            <Input placeholder={data.placeHolder} />
                          </Form.Item>
                        );
                      })}
                      <div className={clsx(styles.checkbox_main_div, styles.checkbox_dflex)}>
                        <Checkbox
                          className={styles.check_box_style}
                          onChange={onChangeCheck}
                        ></Checkbox>
                        <Paragraph className={styles.checkbox_text}>{T_AND_C}</Paragraph>
                      </div>
                      <Button
                        onClick={onFinish}
                        htmlType={HTML_TYPE}
                        className={clsx({
                          [styles.disabled_btn]: !tandc,
                          [styles.btn_gray]: true
                        })}
                      >
                        {PROCEED}
                        <img
                          alt={ALT_IMG}
                          className={styles.instruction_btn_rightarrow}
                          src={rightArrow}
                        />
                      </Button>
                    </Form>
                  </div>
                  <div
                    className={clsx(styles.instruction_card_email, styles.sample_assessment_div)}
                  >
                    {SAMPLE_ASSESSMENT}
                  </div>
                  <div className={styles.plain_text_footer}>
                    <Paragraph className={styles.footer_assessment_txt}>
                      {ASSESSMENT_RECOMMENDATION}
                    </Paragraph>
                    <Paragraph className={styles.footer_assessment_txt}>
                      <Text className={styles.url_link_clr}>{CLICK_HERE}</Text> {TO_TAKE_SAMPLE}
                    </Paragraph>
                    {NOTE}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TestLandingPage);
