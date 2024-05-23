import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "antd/dist/antd.css";
import styles from "./App.module.scss";

import constants from "./constants/constants";

import MainLayout from "./views/MainLayout/MainLayout";

const LandingPage = React.lazy(() =>
  import("./views/testInstructionPages/landingAndAssessment/testLandingPage")
);
const Instruction = React.lazy(() =>
  import("./views/testInstructionPages/landingAndAssessment/assessmentInstruction")
);
const DoSelectInstructions = React.lazy(() =>
  import("./views/testInstructionPages/instructionFromDoSelect/instructionFromDoSelect")
);
const TestSubmitSectionPage = React.lazy(() =>
  import("./views/testInstructionPages/testQuestionsPage/testQuestionsPage")
);
const Faq = React.lazy(() => import("./views/Faq/Faq"));
const Feedback = React.lazy(() => import("./views/Feedback/Feedback"));
const TestCompleted = React.lazy(() => import("./views/TestComplete/TestComplete"));
const Footer = React.lazy(() => import("./components/footer/footer"));

const {
  ROUTE: {
    LANDING_PAGE,
    INSTRUCTION_PAGE,
    DOSELECT_INSTRUCTION,
    TEST_SECTION_SUBMIT,
    FAQ,
    FEEDBACK,
    TESTCOMPLETE
  }
} = constants;

function App() {
  return (
    <MainLayout
      component={
        <Suspense fallback={<div>Loading... </div>}>
          <Routes>
            <Route path={LANDING_PAGE} element={<LandingPage />} />
            <Route path={INSTRUCTION_PAGE} element={<Instruction />} />
            <Route path={DOSELECT_INSTRUCTION} element={<DoSelectInstructions />} />
            <Route path={TEST_SECTION_SUBMIT} element={<TestSubmitSectionPage />} />
            <Route path={FAQ} element={<Faq />} />
            <Route path={FEEDBACK} element={<Feedback />} />
            <Route path={TESTCOMPLETE} element={<TestCompleted />} />

            <Route path="*" element={<Navigate to={LANDING_PAGE} />} />
          </Routes>
          <Footer />
        </Suspense>
      }
    ></MainLayout>
  );
}

export default App;
