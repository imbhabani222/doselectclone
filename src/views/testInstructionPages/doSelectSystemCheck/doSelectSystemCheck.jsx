import React, { useState, useEffect, useCallback } from "react";
import { Select, Spin, Row, Col, message, Typography, Space, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";

import tick from "../../../assets/tick.svg";
import audio from "../../../assets/audio.svg";
import music from "../../../assets/music.svg";
import network from "../../../assets/network.svg";
import os from "../../../assets/os.svg";
import browser from "../../../assets/browser.svg";
import webcam from "../../../assets/webcam.svg";
import mic from "../../../assets/mic.svg";
import cameraSwitch from "../../../assets/cam_off.svg";
import redcross from "../../../assets/red-cross.svg";
import testSound from "../../../assets/testSound.mp3";

import styles from "./systemCheck.module.scss";

import constants from "../../../constants/constants";
import instructionDetails from "../../../constants/instructionConstant";
import BrowserOSDetails from "../utilitySystemCheck/browserAndOsDetails";
import AudioVisualizer from "../utilitySystemCheck/audioVisualizer";

const { Text, Paragraph } = Typography;
const { DEFAULT_KEY, VIDEO_KEY } = constants;

const {
  SPACE_DIRECTION,
  SYSTEM_CHECK,
  PASSED,
  TEST_SYSTEM,
  OS,
  BROWSER,
  TEST_URL,
  CHECK_SOUND,
  CHK_CAM,
  CHK_MIC,
  CHK_VIDEO,
  CHECKING,
  PLAY_SOUND,
  PLAY_TO_HEAR,
  ID_MYAUDIO,
  ALT_IMG,
  INTERNET_SPEED,
  SOUND,
  AUDIO_TYPE_MPEG,
  MAKE_SOUND,
  VIDEO,
  AUDIO_TYPE_OGG,
  MICROPHONE,
  LOW_SPEED,
  MBPS,
  FEATURE_NOT_SUPPORTED,
  DEFAULT_CAM,
  DEFAULT_MIC,
  DEFAULT_SPEAK,
  CAM_OFF,
  WINDOWS,
  WIN11_OR_LATER,
  PF_VERSION
} = instructionDetails;
const { Option } = Select;
const DoSelectSystemCheck = () => {
  const [winVersion, setWinVersion] = useState(null);
  const [videoStatus, setVideoStatus] = useState(undefined);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [systemInfo, setSystemInfo] = useState({});
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [inputAudioDd, setgetInputAudioArray] = useState([]);
  const [outputAudioDd, setgetOutAudioArray] = useState([]);
  const [videoDd, setgetVideoArray] = useState([]);
  const [handleMemoryLeak, setMemoryStatus] = useState(true);
  const [speakerVal, setSpeakersDeviceId] = useState(DEFAULT_KEY);
  const data = true;

  const playAudio = useCallback(async () => {
    const audio = document.getElementById(ID_MYAUDIO);
    try {
      await audio.setSinkId(speakerVal);
      audio.play();
    } catch (err) {
      message.error(FEATURE_NOT_SUPPORTED);
    }
  }, [speakerVal]);

  const getDownloadSpeed = useCallback(() => {
    let startTime, endTime;
    let testConnectionSpeed = {
      imageAddr: TEST_URL,
      downloadSize: 2707459,
      run: (mbps_max, cb) => {
        testConnectionSpeed.mbps_max = parseFloat(mbps_max) ? parseFloat(mbps_max) : 0;
        testConnectionSpeed.cb = cb;
        testConnectionSpeed.InitiateSpeedDetection();
      },
      InitiateSpeedDetection: () => {
        window.setTimeout(testConnectionSpeed.MeasureConnectionSpeed, 1);
      },
      result: () => {
        let duration = (endTime - startTime) / 1000;
        let bitsLoaded = testConnectionSpeed.downloadSize * 8;
        let speedBps = (bitsLoaded / duration).toFixed(2);
        let speedKbps = (speedBps / 1024).toFixed(2);
        let speedMbps = (speedKbps / 1024).toFixed(2);
        testConnectionSpeed.cb(speedMbps);
      },
      MeasureConnectionSpeed: () => {
        let download = new Image();
        download.onload = () => {
          endTime = new Date().getTime();
          testConnectionSpeed.result();
        };
        startTime = new Date().getTime();
        let cacheBuster = `?nnn=${startTime}`;
        download.src = testConnectionSpeed.imageAddr + cacheBuster;
      }
    };
    testConnectionSpeed.run(2, (mbps) => {
      setDownloadSpeed(mbps);
    });
  }, []);
  const systmeInfo = useCallback(() => {
    setSystemInfo(BrowserOSDetails());
  }, []);

  const getAudioInput = useCallback(async () => {
    let getAllMediaDetails = [];
    let deviceInfos = await navigator.mediaDevices.enumerateDevices();
    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      getAllMediaDetails.push({
        deviceId: deviceInfo.deviceId,
        groupId: deviceInfo.groupId,
        kind: deviceInfo.kind,
        options: deviceInfo.label
      });
    }
    let getInputAudioArray = getAllMediaDetails.filter((data) => data.kind === "audioinput");
    let getOutAudioArray = getAllMediaDetails.filter((data) => data.kind === "audiooutput");
    let getVideoArray = getAllMediaDetails.filter((data) => data.kind === "videoinput");
    setgetInputAudioArray(getInputAudioArray);
    setgetOutAudioArray(getOutAudioArray);
    setgetVideoArray(getVideoArray);
  }, []);
  const onChangeSpeaker = useCallback((value) => {
    setSpeakersDeviceId(value);
  }, []);
  const openWebcam = useCallback((stream) => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.getUserMedia(
      {
        video: true
      },
      (stream) => {
        const videoElement = document.querySelector(VIDEO_KEY);
        if (videoElement) {
          setVideoStatus(videoElement);
          videoElement.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  }, []);
  const gotStream = useCallback((stream) => {
    window.stream = stream;
    let element = document.querySelector(VIDEO_KEY);
    element.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
  }, []);
  const getWinVersion = useCallback(() => {
    navigator.userAgentData.getHighEntropyValues([PF_VERSION]).then((ua) => {
      if (navigator.userAgentData.platform === WINDOWS) {
        const majorPlatformVersion = parseInt(ua.platformVersion.split(".")[0]);
        if (majorPlatformVersion >= 13) {
          setWinVersion(WIN11_OR_LATER);
        } else {
          setWinVersion(null);
        }
      }
    });
  }, []);
  const handleError = useCallback((error) => {
    message.error();
  }, []);
  const onChangeCamera = useCallback(
    (value) => {
      const constraints = {
        audio: false,
        video: { deviceId: value }
      };
      navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
    },
    [gotStream, handleError]
  );

  const stopCam = useCallback(() => {
    navigator.mediaDevices.getUserMedia({ audio: false, video: false }).then((mediaStream) => {
      document.querySelector(VIDEO_KEY).srcObject = mediaStream;
      const tracks = mediaStream.getTracks();
      tracks[0].stop();
    });
  }, []);
  useEffect(() => {
    if (handleMemoryLeak) {
      getDownloadSpeed();
    }
    getWinVersion();
    systmeInfo();
    getAudioInput();
    openWebcam();
    return () => {
      setMemoryStatus(false);
    };
  }, [handleMemoryLeak, getWinVersion, getDownloadSpeed, systmeInfo, getAudioInput, openWebcam]);
  return (
    <div className={styles.system_check_main_div}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className={styles.col_div}>
            <div className={styles.system_check_card}>
              <Paragraph className={styles.system_check_card_header}>
                {SYSTEM_CHECK} <Text>{PASSED}</Text>
              </Paragraph>
              <div className={styles.system_check_content}>
                {downloadSpeed !== null ? (
                  <img className={styles.left_check_icon} alt={ALT_IMG} src={network} />
                ) : (
                  <Spin className={styles.spin_icon} indicator={antIcon} />
                )}
                <ul>
                  <li className={styles.system_check_content_header}>
                    {INTERNET_SPEED}
                    {downloadSpeed !== null && downloadSpeed > 2 ? (
                      <img className={styles.right_check_icon} alt={ALT_IMG} src={tick} />
                    ) : downloadSpeed !== null && downloadSpeed < 2 ? (
                      <img className={styles.right_check_icon} alt={ALT_IMG} src={redcross} />
                    ) : null}
                  </li>
                  <li className={styles.system_check_content_subheader}>
                    {downloadSpeed
                      ? downloadSpeed + (downloadSpeed < 2 ? LOW_SPEED : MBPS)
                      : CHECKING}
                  </li>
                </ul>
              </div>
              <div className={styles.system_check_content}>
                {data ? (
                  <img className={styles.left_check_icon} alt={ALT_IMG} src={os} />
                ) : (
                  <Spin className={styles.spin_icon} indicator={antIcon} />
                )}
                <ul>
                  <li className={styles.system_check_content_header}>
                    {OS}
                    {data ? (
                      <img className={styles.right_check_icon} alt={ALT_IMG} src={tick} />
                    ) : null}
                  </li>
                  <li className={styles.system_check_content_subheader}>
                    {data
                      ? `${systemInfo.os} ${
                          systemInfo.os === "Windows" && winVersion !== null
                            ? winVersion
                            : systemInfo.osVersion
                        }`
                      : CHECKING}
                  </li>
                </ul>
              </div>

              <div className={styles.system_check_content}>
                {data ? (
                  <img className={styles.left_check_icon} alt={ALT_IMG} src={browser} />
                ) : (
                  <Spin className={styles.spin_icon} indicator={antIcon} />
                )}
                <ul>
                  <li className={styles.system_check_content_header}>
                    {BROWSER}
                    {data ? (
                      <img className={styles.right_check_icon} alt={ALT_IMG} src={tick} />
                    ) : null}
                  </li>
                  <li className={styles.system_check_content_subheader}>
                    {data ? `${systemInfo.browser} ${systemInfo.browserVersion}` : CHECKING}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} className={styles.right_col}>
          <div className={styles.col_div}>
            <div className={styles.system_check_card}>
              <Paragraph className={styles.system_check_card_header}>{TEST_SYSTEM}</Paragraph>
              <div className={styles.test_check_array}>
                <div
                  className={clsx(styles.system_check_content_right, styles.system_check_content)}
                >
                  <Row className={styles.test_system_width}>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Paragraph
                        className={clsx(styles.system_check_content_header, styles.right_content)}
                      >
                        {SOUND}
                      </Paragraph>
                      <div className={styles.d_flex}>
                        <img className={styles.custom_margin} alt={ALT_IMG} src={audio} />
                        <Select
                          onChange={onChangeSpeaker}
                          className={styles.dd_radius}
                          defaultValue={DEFAULT_SPEAK}
                        >
                          {outputAudioDd.map((data, index) => {
                            return (
                              <Option key={index} value={data.deviceId}>
                                {data.options === "" ? DEFAULT_SPEAK : data.options}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <div className={styles.responsive_col}>
                        <Space direction={SPACE_DIRECTION} size={1}>
                          <Text className={styles.system_check_content_header}>{CHECK_SOUND}</Text>
                          <Text className={styles.test_info_txt}>{PLAY_TO_HEAR}</Text>
                          <Button onClick={playAudio} className={styles.play_sound_btn}>
                            <img alt={ALT_IMG} src={music} /> {PLAY_SOUND}
                          </Button>
                        </Space>
                        <audio id={ID_MYAUDIO}>
                          <source src={testSound} type={AUDIO_TYPE_OGG} />
                          <source src={testSound} type={AUDIO_TYPE_MPEG} />
                        </audio>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div
                  className={clsx(styles.system_check_content_right, styles.system_check_content)}
                >
                  <Row className={styles.test_system_width}>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Paragraph
                        className={clsx(styles.system_check_content_header, styles.right_content)}
                      >
                        {MICROPHONE}
                      </Paragraph>
                      <div className={styles.d_flex}>
                        <img className={styles.custom_margin} alt={ALT_IMG} src={mic} />
                        <Select className={styles.dd_radius} defaultValue={DEFAULT_MIC}>
                          {inputAudioDd.map((data, index) => {
                            return (
                              <Option key={index} value={data.deviceId}>
                                {data.options === "" ? DEFAULT_MIC : data.options}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <div className={styles.responsive_col}>
                        <Space direction={SPACE_DIRECTION} size={1}>
                          <Text className={styles.system_check_content_header}>{CHK_MIC}</Text>
                          <Text className={styles.test_info_txt}>{MAKE_SOUND}</Text>
                        </Space>
                        <AudioVisualizer />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div
                  className={clsx(styles.system_check_content_right, styles.system_check_content)}
                >
                  <Row className={styles.test_system_width}>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Paragraph
                        className={clsx(styles.system_check_content_header, styles.right_content)}
                      >
                        {VIDEO}
                      </Paragraph>
                      <div className={styles.d_flex}>
                        <img className={styles.custom_margin} alt={ALT_IMG} src={webcam} />
                        <Select
                          onChange={onChangeCamera}
                          className={styles.dd_radius}
                          defaultValue={DEFAULT_CAM}
                        >
                          {videoDd.map((data, index) => {
                            return (
                              <Option key={index} value={data.deviceId}>
                                {data.options === "" ? DEFAULT_CAM : data.options}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <div className={styles.responsive_col}>
                        <Space direction={SPACE_DIRECTION}>
                          <Text className={styles.system_check_content_header}>{CHK_VIDEO}</Text>
                          <Text className={styles.test_info_txt}>{CHK_CAM}</Text>
                          <div className={styles.camera_screen}>
                            {videoStatus === undefined ? (
                              <>
                                <Space>
                                  <Text>{CAM_OFF}</Text>
                                </Space>
                                <img alt={ALT_IMG} src={cameraSwitch} />
                              </>
                            ) : null}
                            <video
                              className={styles.systemCheck_video}
                              playsInline
                              autoPlay
                            ></video>
                          </div>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(DoSelectSystemCheck);
