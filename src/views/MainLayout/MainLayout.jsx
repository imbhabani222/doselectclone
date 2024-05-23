import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import moment from "moment";

import styles from "../../App.module.scss";

import Navbar from "../../components/navbar/navbar";
import DataBar from "../../components/dataBar/dataBar";
import BreezeModal from "../../components/modal/modal";
import timerData from "../../data/counter.json";

import { getSubmitConformationModal } from "../../constants/modals";
import { systemActions } from "../../actions/actions";

const { Content } = Layout;
const { timeLeft } = timerData;
const MainLayout = ({ component }) => {
  const [showWarningModal, setWarningModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(systemActions({ timeLeft: moment().add(timeLeft, "seconds").valueOf() }));
  }, [dispatch]);

  const hideModal = useCallback(() => {
    dispatch(systemActions({ showModal: false }));
  }, [dispatch]);

  const systemActionReducer = useSelector(
    (state) => state.appReducer && state.appReducer.actionReducer,
    shallowEqual
  );

  const submissionModalData = useCallback(() => {
    const data = getSubmitConformationModal({
      onOk: hideModal,
      onCancel: hideModal,
      timeLeft: systemActionReducer.timeLeft
    });
    return <BreezeModal modalData={data} visible={systemActionReducer.showModal} />;
  }, [systemActionReducer, hideModal]);

  useEffect(() => {
    if (systemActionReducer) {
      setWarningModal(systemActionReducer.showModal);
    }
  }, [systemActionReducer]);

  return (
    <Layout className={styles.mainLayout}>
      <Navbar />
      <Content className={styles.container}>
        <DataBar />
        <div className={styles.content}>{component}</div>
      </Content>
      {showWarningModal && submissionModalData()}
    </Layout>
  );
};

export default React.memo(MainLayout);
