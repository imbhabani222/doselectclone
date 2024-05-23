import React, { useEffect, useState } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Tabs, Row, Col, Typography, Image } from "antd";

import infoIcon from "../../assets/Images/infoIcon.svg";
import searchIcon from "../../assets/Images/MagnifyingGlass.svg";

import styles from "./Faq.module.scss";

import LoadMore from "../../views/LoadMore/LoadMore";
import CardCollapse from "../../components/collapse/CardCollapse";
import TableContainer from "../../components/TableContainer/TableContainer";

import messages from "../../constants/messages";
import { data, dataSER } from "./data";
import { columnsCED, columnsSER } from "./column";
import faqCardsData from "../../data/faq-cards.json";

import { sampleAction } from "../../actions/actions";

const {
  FAQ: { FAQINFOTEXT, SEARCH_PLACEHOLDER, TAB1, TAB2, TAB3, KEY1, KEY2, KEY3 },
  ICON
} = messages;

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const Faq = () => {
  const dispatch = useDispatch();
  const [loadTill, setCount] = useState(2);
  useEffect(() => {
    dispatch(sampleAction());
  }, [dispatch]);

  const sampleReducerResponse = useSelector(
    (state) => state.appReducer && state.appReducer.sampleReducer,
    shallowEqual
  );

  useEffect(() => {
    if (sampleReducerResponse && sampleReducerResponse.result) {
      window.console.log("sampleReducer", sampleReducerResponse);
    }
  }, [sampleReducerResponse]);

  const loadMore = () => {
    setCount(loadTill + 2);
  };

  const FaqTabs = () => (
    <Tabs key={KEY1}>
      <TabPane tab={TAB1}>
        {faqCardsData &&
          faqCardsData
            .slice(0, loadTill)
            .map((val, index) => (
              <CardCollapse question={val.question} key={index} answer={val.answer} />
            ))}
        {loadTill < faqCardsData.length && <LoadMore onClick={loadMore} />}
      </TabPane>
      <TabPane tab={TAB2} key={KEY2}>
        <div>
          <TableContainer
            columnsData={columnsCED}
            bordered
            data={data}
            pagination={false}
            scroll={{ y: 800, x: 700 }}
          />
        </div>
      </TabPane>
      <TabPane tab={TAB3} key={KEY3}>
        <TableContainer
          columnsData={columnsSER}
          bordered
          data={dataSER}
          pagination={false}
          scroll={{ x: 700 }}
        />
      </TabPane>
    </Tabs>
  );

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.InfoSearch}>
          <div className={styles.InfoBox}>
            <span>
              <Image src={infoIcon} alt={ICON} preview={false} />
            </span>
            <Paragraph className={styles.text}>{FAQINFOTEXT}</Paragraph>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <Image src={searchIcon} alt={ICON} preview={false} />
              <input placeholder={SEARCH_PLACEHOLDER} />
            </div>
          </div>
        </div>
        <div className={styles.tabContainer}>
          <FaqTabs />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Faq);
