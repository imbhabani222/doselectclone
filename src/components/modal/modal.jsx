import React from "react";
import { Modal, Divider } from "antd";
import Icon from "@ant-design/icons";

import styles from "./modal.module.scss";

import { ReactComponent as closeIcon } from "../../assets/Xicon.svg";

import ButtonGrp from "../buttonGrp/buttonGrp";
import FormatData from "../markedData/markedData";

const BreezeModal = ({ modalData, visible }) => {
  const { onOk, onCancel, buttons, text } = modalData;
  return (
    <Modal
      className={styles.modal_class}
      centered
      width={800}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      closable={false}
    >
      <div className={styles.modal_wrapper}>
        <div className={styles.modal_head}></div>
        <div className={styles.xicon}>
          <Icon component={closeIcon} onClick={onCancel} />
        </div>
        <FormatData className={styles.modalContent} formatData={text} />
        <Divider className={styles.divider} />
        <ButtonGrp className={styles.modal_btn_div} buttons={buttons} />
      </div>
    </Modal>
  );
};

export default React.memo(BreezeModal);
