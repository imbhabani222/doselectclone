import SystemCheck from "../doSelectSystemCheck/doSelectSystemCheck.jsx";
import IdentityCheck from "../doSelectSystemCheck/doSelectIdentityCheck.jsx";

import instructionDetails from "../../../constants/instructionConstant";

import { collapsableData } from "../../../data/instructionData";
import CardCollapse from "../../../components/collapse/CardCollapse.jsx";

const { STEPS_TITLE_1, STEPS_TITLE_2, STEPS_TITLE_3, INSTRUCTION, IDENTITY_CHECK, SYSTEM_CHECK } =
  instructionDetails;

export const steps = [
  {
    title: STEPS_TITLE_1,
    subTitle: INSTRUCTION,
    content: collapsableData.map((data, index) => {
      return <CardCollapse question={data.header} key={index} answer={data.content} />;
    })
  },
  {
    title: STEPS_TITLE_2,
    subTitle: SYSTEM_CHECK,
    content: <SystemCheck />
  },
  {
    title: STEPS_TITLE_3,
    subTitle: IDENTITY_CHECK,
    content: <IdentityCheck />
  }
];
