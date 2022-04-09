/* global describe it*/
import IDE from "../src/taskpane/components/IDE";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import { build, fake } from "test-data-bot";
import "@testing-library/jest-dom/extend-expect";

describe("IDE.tsx has mounted", () => {
  it("render", () => {
    const {} = render(<IDE />);
  });
});
