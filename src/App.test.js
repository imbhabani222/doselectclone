import { render, screen } from "@testing-library/react";
import App from "./App";

import messages from "./constants/messages";

const { NO_DATA_AVAILABLE } = messages;

test("renders learn react link", () => {
  render(<App />);
  const element = screen.getByText(NO_DATA_AVAILABLE);
  expect(element).toBeInTheDocument();
});
