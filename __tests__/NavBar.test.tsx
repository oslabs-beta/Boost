/* global describe it*/
import NavBar from "../src/taskpane/components/NavBar";
import { Contexts } from "../src/taskpane/components/Contexts";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import { build, fake } from "test-data-bot";
import "@testing-library/jest-dom/extend-expect";

describe("NavBar.tsx has mounted", () => {
  it("render", () => {
    const {} = render(<NavBar />);
  });
});

import '@testing-library/jest-dom/extend-expect'
import {
  renderHook,
  act,
  cleanup,
} from '@testing-library/react-hooks';

afterEach(cleanup);
describe('NavBar useContext', () => {
  test('', () => {
    const {
      result
    } = renderHook(() => ());

  })

});


jest.fn()
