/* global describe it*/
import QueryTable from "../src/taskpane/components/query/QueryTable";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import { build, fake } from "test-data-bot";
import "@testing-library/jest-dom/extend-expect";

describe("QueryTable did mount", () => {
  it("renders", () => {
    const {} = render(<QueryTable columns={[{ header: "hello" }]} data={[[" "]]} />);
  });
});
