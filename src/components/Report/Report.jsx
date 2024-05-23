import React, { useState, useCallback } from "react";
import { Modal, Button, Radio, Space, Row, Col, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import ReportStyle from "../Report/Report.module.scss";

import { reportcontent } from "../../data/report";
import messages from "../../constants/messages";

const {
  FEEDBACK: { SUBMIT_LABEL },
  REPORT_LABLE,
  REPORT_MODAL_TITLE,
  REPORT_MODAL_INPUT_LABEL,
  OTHER_LABEL
} = messages;

const Report = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [inputval, setInputVal] = useState("");

  const showModal = useCallback(() => {
    setIsModalVisible(true);
    setValue("");
    setInputVal("");
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleChange = useCallback((e) => {
    setInputVal(e.target.value);
  }, []);

  const handelmouse = useCallback(() => {
    setValue("");
  }, []);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
    setInputVal("");
  }, []);

  return (
    <div className={ReportStyle.report_container}>
      <Button
        className={ReportStyle.report_btn}
        icon={<ExclamationCircleOutlined />}
        onClick={showModal}
      >
        {REPORT_LABLE}
      </Button>
      <Modal
        title={REPORT_MODAL_TITLE}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={700}
        height={541}
        className={ReportStyle.report_modal}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Radio.Group defaultValue="" onChange={onChange} value={value}>
              <Space direction="vertical">
                {reportcontent?.map((ele) => (
                  <Radio.Button value={ele.question}>{ele.question}</Radio.Button>
                ))}
              </Space>
            </Radio.Group>
            <div className={ReportStyle.Inputstyle} onClick={handelmouse}>
              <div className={ReportStyle.Inputlabel}>{REPORT_MODAL_INPUT_LABEL}</div>
              <div>
                <Input
                  placeholder={OTHER_LABEL}
                  maxlength="100"
                  onChange={(e) => handleChange(e)}
                  value={inputval}
                  disabled={value !== ""}
                />
              </div>
            </div>
            <Button
              key="submit"
              onClick={handleOk}
              className={ReportStyle.submit_btn}
              htmlType="submit"
              disabled={value === "" || inputval === ""}
            >
              {SUBMIT_LABEL}
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default React.memo(Report);
