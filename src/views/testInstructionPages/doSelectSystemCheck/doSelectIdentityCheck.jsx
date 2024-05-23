import React, { useEffect, useState, useCallback } from "react";
import { Checkbox, Row, Col, Typography, Button } from "antd";
import clsx from "clsx";

import instructionDetails from "../../../constants/instructionConstant";
import styles from "./systemCheck.module.scss";

import info from "../../../assets/info.svg";
import takeSnapshot from "../../../assets/take-snapshot.svg";

import { identityArray } from "../../../data/instructionData";

const { Text } = Typography;
const {
  IDENTITY_INFO,
  BTN_ID,
  TAKE_SNAPSHOT,
  APP_VIDEO_FEED,
  CHECKBOX_TXT,
  BTN_TYPE,
  ALT_IMG,
  CANVASID_IDENTITY_CHK,
  CANVAS_DIMENSION,
  TO_DATA_URL,
  USER_IMG_PATH
} = instructionDetails;

const DoSelectIdentityCheck = () => {
  const [camImage, setImage] = useState(null);
  const openCamera = useCallback(() => {
    navigator.getUserMedia(
      {
        video: true
      },
      (stream) => {
        var video = document.getElementsByClassName(APP_VIDEO_FEED)[0];
        var canvas = document.getElementById(CANVASID_IDENTITY_CHK);
        var button = document.getElementById(BTN_ID);
        if (video) {
          video.srcObject = stream;
        }
        button.disabled = false;
        button.onclick = function () {
          canvas.getContext(CANVAS_DIMENSION).drawImage(video, 0, 0, 160, 160);
          var img = canvas.toDataURL(TO_DATA_URL);
          setImage({
            imgPath: img,
            imgBase64: img.replace(USER_IMG_PATH, ""),
            playing: false
          });
          video.srcObject.getTracks()[0].stop();
        };
      },
      (err) => console.error(err)
    );
  }, []);
  useEffect(() => {
    openCamera();
  }, [openCamera]);

  return (
    <div className={styles.identity_check}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className={styles.identity_left_content}>
            <img alt={ALT_IMG} src={info} />
            <Text className={styles.identity_info_txt}>{IDENTITY_INFO}</Text>
          </div>
          <div className={clsx(styles.testlanding_main_wrapper, styles.info_main_div)}>
            {identityArray.map((data, index) => {
              return (
                <div key={index} className={styles.ellipse_parent_div}>
                  <div className={styles.ellipse}></div>
                  <div className={clsx(styles.common_text_header, styles.ellipse_text)}>
                    {data.title}
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <div className={styles.web_cam}>
            <div>
              <canvas className={styles.canvas_class} id={CANVASID_IDENTITY_CHK}></canvas>
              <video muted autoPlay className={clsx(styles.video_class, APP_VIDEO_FEED)}></video>
            </div>
            <Button type={BTN_TYPE} id={BTN_ID} className={styles.snapshot_btn}>
              <img alt={ALT_IMG} src={takeSnapshot} />
              <Text>{TAKE_SNAPSHOT}</Text>
            </Button>
          </div>
        </Col>
      </Row>
      <div
        className={clsx(
          styles.testlanding_main_wrapper,
          styles.checkbox_identity,
          styles.checkbox_main_div
        )}
      >
        <Checkbox className={styles.check_box_style}></Checkbox>
        <Text className={styles.checkbox_text_identity}>{CHECKBOX_TXT}</Text>
      </div>
    </div>
  );
};

export default React.memo(DoSelectIdentityCheck);
