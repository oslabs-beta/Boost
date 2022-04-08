/* global describe it*/
import Query from "../src/taskpane/components/Query";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import { build, fake } from "test-data-bot";
import "@testing-library/jest-dom/extend-expect";

describe("Query.tsx has mounted", () => {
  it("render", () => {
    const {} = render(<Query />);
  });
});
