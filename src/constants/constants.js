import messages from "./messages";

const constants = {
  HTTP_REQ_DEFAULT_HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  },
  HTTP_MULTIPART_FORM_HEADERS: {
    "Content-Type": false
  },
  HTTP_METHODS: {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
    PATCH: "PATCH",
    PUT: "PUT"
  },
  HTTP_REQ_ERROR_MAP: {
    401: { status: 401, message: messages.NOT_AUTHORIZED },
    403: { status: 403, message: messages.ACCESS_DENIED },
    404: { status: 404, message: messages.NO_DATA_AVAILABLE }
  },
  ROUTE: {
    LANDING_PAGE: "/landingPage",
    INSTRUCTION_PAGE: "/instructionPage",
    DOSELECT_INSTRUCTION: "/doSelectInstruction",
    TEST_SECTION_SUBMIT: "/submitSections",
    FAQ: "/Faqs",
    FEEDBACK: "/Feedback",
    TESTCOMPLETE: "/TestComplete",
    TESTLAYOUT: "/TestLayout"
  },
  NAME_KEY: "name",
  VERSION_KEY: "version",
  MU_KEY: "Mu",
  TL_KEY: "Tl",
  LA_KEY: "LA",
  DESCRIPTION_KEY: "description",
  DEFAULT_KEY: "default",
  VIDEO_KEY: "video",
  PROGRESSBAR_KEY: "progressbar"
};

export default constants;
