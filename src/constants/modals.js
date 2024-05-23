import messages from "./messages";
import { getDuration, getTimeDiff, stringFiller } from "./../data/utils";
const { CANCEL, SUBMIT_END, ARE_YOU_SURE, MODAL_CONTENT, TYPE_OUTLINE, TYPE_FILLED } = messages;
const getString = (timeLeft, str) => {
  return stringFiller(str, { ...getDuration(getTimeDiff(timeLeft)), total: 8, completed: 2 });
};
export const getSubmitConformationModal = ({ onOk, onCancel, timeLeft }) => {
  return {
    title: ARE_YOU_SURE,
    onOk: onOk,
    onCancel: onCancel,
    text: getString(timeLeft, MODAL_CONTENT),
    buttons: [
      {
        type: TYPE_OUTLINE,
        display: CANCEL,
        onClick: onCancel
      },
      {
        type: TYPE_FILLED,
        display: SUBMIT_END,
        onClick: onOk
      }
    ]
  };
};
