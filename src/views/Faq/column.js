import React from "react";

import constants from "../../constants/constants";
import messages from "../../constants/messages";

import TestStatus from "./TestStatus";

const { NAME_KEY, VERSION_KEY, MU_KEY, TL_KEY, LA_KEY, DESCRIPTION_KEY } = constants;
const {
  DESCRIPTION_LABEL,
  STATUS_CODE_LABEL,
  LIBRARIES_AVAILABLE_LABEL,
  TIME_LIMIT_LABEL,
  MEMORY_UNIT_LABEL,
  VERSION_LABEL,
  LANGUAGE_LABEL
} = messages;

export const columnsCED = [
  {
    title: LANGUAGE_LABEL,
    dataIndex: NAME_KEY,
    width: 250
  },
  {
    title: VERSION_LABEL,
    dataIndex: VERSION_KEY,
    width: 310
  },
  {
    title: MEMORY_UNIT_LABEL,
    dataIndex: MU_KEY,
    width: 155
  },
  {
    title: TIME_LIMIT_LABEL,
    dataIndex: TL_KEY,
    width: 160
  },
  {
    title: LIBRARIES_AVAILABLE_LABEL,
    dataIndex: LA_KEY,
    width: 250
  }
];

export const columnsSER = [
  {
    title: STATUS_CODE_LABEL,
    dataIndex: NAME_KEY,
    width: 200,
    render: (text, record) => (
      <TestStatus status={record.status} id={record._id} name={record.name} />
    )
  },
  {
    title: DESCRIPTION_LABEL,
    dataIndex: DESCRIPTION_KEY,
    width: 650
  }
];
