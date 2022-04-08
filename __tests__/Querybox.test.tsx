/* global describe it*/
import Querybox from "../src/taskpane/components/query/Querybox";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import { build, fake } from "test-data-bot";
import "@testing-library/jest-dom/extend-expect";

// describe("Querybox.tsx mounts", () => {
//   it("component did mount", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(
//       <Querybox
//         onSubmit={() => {
//           return null;
//         }}
//       />,
//       div
//     );
//   });
// });

describe("Querybox.tsx mounts", () => {
  it("component renders", () => {
    const {} = render(
      <Querybox
        onSubmit={() => {
          return null;
        }}
      />
    );
  });
});
