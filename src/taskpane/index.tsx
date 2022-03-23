import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";

/* global document, Office, module, require */

// initializeIcons();

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const render = (Component: any) => {
  ReactDOM.render(
    <Component title={title} isOfficeInitialized={isOfficeInitialized} />,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
