import moment from "moment";
import clsx from "clsx";

import email from "../assets/Images/email.svg";
import clientemail from "../assets/Images/clientemail.svg";
import clientcall from "../assets/Images/clientcall.svg";
import call from "../assets/Images/call.svg";
import clock from "../assets/Images/clock.svg";
import record from "../assets/Images/record.svg";
import calender from "../assets/Images/calender.svg";
import exam from "../assets/Images/exam-icon@2x.svg";

import constants from "../constants/constants";
import messages from "../constants/messages";

import { formatDateTime, getDuration, stringFiller } from "./utils";

const { PROGRESSBAR_KEY } = constants;
const { TIME_FOR_EXAM_LABEL, EXAM_NAME, EXAM_TYPE } = messages;
export const dataBarData = {
  total: 8,
  completed: 2,
  startDate: moment().valueOf(),
  endDate: moment().add(1, "day").valueOf(),
  examName: EXAM_NAME,
  examType: EXAM_TYPE,
  timeToComplete: 4200
};

const duration = getDuration(dataBarData.timeToComplete);
export const dataBarContent = [
  {
    id: 1,
    data: [
      {
        id: "1",
        image: exam,
        alt: "exam",
        title: dataBarData.examName,
        subtitle: dataBarData.examType
      }
    ]
  },
  {
    id: 2,
    data: [
      {
        id: "1",
        image: exam,
        alt: "exam",
        title: dataBarData.examName,
        subtitle: dataBarData.examType
      },
      {
        id: "2",
        type: PROGRESSBAR_KEY,
        total: dataBarData.total,
        completed: dataBarData.completed
      }
    ]
  },
  {
    id: 3,
    data: [
      {
        id: "1",
        image: clock,
        alt: "clock",
        title: stringFiller(TIME_FOR_EXAM_LABEL, duration),
        subtitle: "To take this assessment"
      },
      {
        id: "2",
        image: record,
        alt: "record",
        title: dataBarData.total,
        subtitle: "Problems to be solved"
      },
      {
        id: "3",
        image: calender,
        alt: "calender",
        values: [
          {
            title: clsx("Starts", formatDateTime(dataBarData.startDate).date),
            subtitle: formatDateTime(dataBarData.startDate).time
          },
          {
            title: clsx("Ends", formatDateTime(dataBarData.endDate).date),
            subtitle: formatDateTime(dataBarData.endDate).time
          }
        ]
      }
    ]
  },
  {
    id: 4,
    alignLeft: true,
    title: "Support",
    actionButton: "Go back to Assessment",
    data: [
      {
        id: "1",
        image: email,
        alt: "email",
        title: "support@doselect.com",
        subtitle: "Platform support - Email"
      },
      {
        id: "2",
        image: call,
        alt: "call",
        title: "+91 080-47106630",
        subtitle: "Platform support - Phone"
      }
    ]
  },
 
];

export const progressDatabarContent = [
  {
    id: "1",
    image: exam,
    alt: "exam",
    title: "[0-2 years] Data Analytics",
    subtitle: "By DoSelect UI/UX Testing"
  }
];
