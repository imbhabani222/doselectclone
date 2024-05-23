import React, { useCallback } from "react";
import { Tabs, Button, Input } from "antd";

import resultStyles from "../viewresult/viewresult.module.scss";

import messages from "../../constants/messages";
const {
  FEEDBACK: { SUBMIT_LABEL },
  RUN_CODE_LABEL,
  ABORT_LABEL,
  TEST_RESULTS_TEXT,
  TEST_RESULTS_LABEL,
  CUSTOM_INPUT_LABEL,
  CUSTOM_INPUT_TEXT
} = messages;
const { TabPane } = Tabs;
const { TextArea } = Input;



const Viewresult = () => {
  const handelRuncode = useCallback(() => {
    // TODO : Function for Run code button
  }, []);
  const handelsubmit = useCallback(() => {
    // TODO : Function for submit button
  }, []);
  const handelabort = useCallback(() => {
    // TODO : Function for abort button
  }, []);
  const Operations = {
    left: (
      <div>
        <Button className={resultStyles.extra_button} onClick={handelRuncode}>
          {RUN_CODE_LABEL}
        </Button>
        ,
        <Button className={resultStyles.extra_button} onClick={handelsubmit}>
          {SUBMIT_LABEL}
        </Button>
        ,
        <Button className={resultStyles.extra_button} onClick={handelabort}>
          {ABORT_LABEL}
        </Button>
      </div>
    )
  };

  return (
    <>
      <div className={resultStyles.tab_container}>
        <Tabs type="card" tabBarExtraContent={Operations}>
          <TabPane tab={TEST_RESULTS_LABEL} key="1">
            <div className={resultStyles.tab1_text}>{TEST_RESULTS_TEXT}</div>
          </TabPane>
          <TabPane tab={CUSTOM_INPUT_LABEL} key="2">
            <div className={resultStyles.tab2_text}>{CUSTOM_INPUT_TEXT}</div>
            <div className={resultStyles.tab2_textarea}>
              <TextArea rows={10} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Viewresult;
