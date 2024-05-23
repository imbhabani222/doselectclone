import crossIcon from "../../../assets/cross_white.svg";
import tick_white from "../../../assets/tick_white.svg";
import edit from "../../../assets/edit.svg";
import solve from "../../../assets/tick_gray_circle.svg";
import resume from "../../../assets/resume.svg";
import review from "../../../assets/review.svg";
import mobile_cross_red from "../../../assets/mobile_cross_red.svg";
import mobile_cross_circle from "../../../assets/mobile_cross_circle.svg";
import mobile_edit from "../../../assets/mobile_edit_circle.svg";
import mobile_tick from "../../../assets/mobile_circle_tick.svg";

import styles from "./testQuestions.module.scss";

import instructionDetails from "../../../constants/instructionConstant";
import clsx from "clsx";

const {
  ALT_IMG,
  ROW_KEY,
  COL_KEY_1,
  COL_TITLE_2,
  COL_KEY_2,
  COL_TITLE_3,
  COL_KEY_3,
  STATUS,
  UNSOLVED,
  SOLVING,
  SOLVED,
  ACTIONS,
  SOLVE,
  RESUME,
  REVIEW,
  REJECTED
} = instructionDetails;

export const columnsData = [
  {
    title: COL_KEY_1,
    dataIndex: ROW_KEY,
    key: ROW_KEY,
    className: styles.sl_no_col
  },
  {
    title: COL_TITLE_2,
    dataIndex: COL_KEY_2,
    key: COL_KEY_2,
    className: styles.row_width
  },
  {
    title: COL_TITLE_3,
    dataIndex: COL_KEY_3,
    key: COL_KEY_3,
    className: styles.hide_col
  },
  {
    title: STATUS,
    key: STATUS,
    className: styles.status_width,
    render: (record, id) => {
      let src = () => {
        let url = "";
        switch (record.Status) {
          case UNSOLVED:
            url = crossIcon;
            break;
          case SOLVING:
            url = edit;
            break;
          case SOLVED:
            url = tick_white;
            break;
          default:
            url = crossIcon;
        }
        return url;
      };
      let src_mobile = () => {
        let url = "";
        switch (record.Status) {
          case UNSOLVED:
            url = mobile_cross_circle;
            break;
          case SOLVING:
            url = mobile_edit;
            break;
          case SOLVED:
            url = mobile_tick;
            break;
          default:
            url = mobile_cross_red;
        }
        return url;
      };
      return (
        <>
          <img className={styles.res_img} alt={ALT_IMG} src={src_mobile()} />
          <div
            key={`${id}i`}
            className={clsx({
              [styles.status_btn_gray]: record.Status === UNSOLVED,
              [styles.status_btn_purple]: record.Status === SOLVING,
              [styles.status_btn_green]: record.Status === SOLVED,
              [styles.status_btn_red]: record.Status === REJECTED
            })}
          >
            <img className={styles.status_icons} alt={ALT_IMG} src={src()} />
            {record.Status}
          </div>
        </>
      );
    }
  },
  {
    title: ACTIONS,
    className: styles.action_class,
    render: (record, id) => {
      let src = () => {
        let url = "";
        switch (record.Status) {
          case UNSOLVED:
            url = solve;
            break;
          case SOLVING:
            url = resume;
            break;
          case SOLVED:
            url = review;
            break;
          default:
            url = solve;
        }
        return url;
      };
      let status = () => {
        let status_text = "";
        switch (record.Status) {
          case UNSOLVED:
            status_text = SOLVE;
            break;
          case SOLVING:
            status_text = RESUME;
            break;
          case SOLVED:
            status_text = REVIEW;
            break;
          default:
            status_text = SOLVE;
        }
        return status_text;
      };
      return (
        <div key={`${id}o`} className={styles.action_flex}>
          <img className={styles.action_icon} alt={ALT_IMG} src={src()} />
          <span className={styles.status_action_txt}>{status()}</span>
        </div>
      );
    }
  }
];
