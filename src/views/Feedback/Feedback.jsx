import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Row, Rate, Input, Button, Form, Typography } from "antd";

import FeedbackImg from "../../assets/Images/feedback.svg";

import style from "./Feedback.module.scss";

import constants from "../../constants/constants";
import messages from "../../constants/messages";
import feedbackQA from "../../data/feedback-questions.json";
import DataBar from "../../components/dataBar/dataBar";

const { Paragraph } = Typography;

const {
  FEEDBACK: {
    FEEDBACKCOMPLETED,
    FEEDBACKTITLE,
    FEEDBACKNOTIFIED,
    SENDFEEDBACK,
    LIKETOTELL,
    ENTERFEWWORDS,
    MESSAGE_LABEL,
    SUBMIT_LABEL,
    FEEDBACKFORM
  },
  ICON
} = messages;

const {
  ROUTE: { TESTCOMPLETE }
} = constants;

const Feedback = ({ history }) => {
  const [form] = Form.useForm();
  const onFinish = useCallback(() => {
    form.resetFields();
  }, [form]);

  let navigate = useNavigate();
  const gotoTestComplete = useCallback(() => {
    navigate(TESTCOMPLETE);
  }, [navigate]);

  return (
    <Row>
      <div className={style.container}>
        <div className={style.section1}>
          <h2>{FEEDBACKCOMPLETED}</h2>
          <Paragraph>{FEEDBACKNOTIFIED}</Paragraph>
          <div>
            <img src={FeedbackImg} alt={ICON} />
          </div>
          <h4>{FEEDBACKTITLE}</h4>
        </div>
        <Form name={FEEDBACKFORM} form={form} onFinish={onFinish}>
          <div className={style.section2}>
            {feedbackQA.map((val, index) => (
              <div className={style.contentBox}>
                <div key={index}>
                  <h6>{val.question}</h6>
                </div>
                <div className={style.stars}>
                  <Row>
                    <Form.Item name={val.question}>
                      <Rate allowHalf={false} defaultValue={0} count={5} />
                    </Form.Item>
                  </Row>
                  <Row>
                    <Paragraph>{val.label1}</Paragraph>
                    <Paragraph>{val.label2}</Paragraph>
                  </Row>
                </div>
              </div>
            ))}
            <div className={style.textBox}>
              <Row>
                <h6>{LIKETOTELL}</h6>
              </Row>
              <Form.Item name={MESSAGE_LABEL}>
                <Input.TextArea rows={4} placeholder={ENTERFEWWORDS} maxLength={150} />
              </Form.Item>
              <div>
                <Button onClick={gotoTestComplete} htmlType={SUBMIT_LABEL}>
                  {SENDFEEDBACK}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Row>
  );
};

Feedback.propTypes = {
  history: PropTypes.object
};

export default React.memo(Feedback);
