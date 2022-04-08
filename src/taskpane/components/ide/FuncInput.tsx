/* global JSX */
import React from "react";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import "codemirror/theme/solarized.css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";

export default (props: any): JSX.Element => {
  const { language, value, onChange } = props;

  const handleChange = (editor: any, data: any, value: string) => {
    onChange(value);
  };
  return (
    <>
      <div className="editor-container">
        <div className="editor-title">
          TS
          <button>O/C</button>
        </div>
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            theme: "solarized",
            mode: language,
            lineNumbers: true,
          }}
        />
      </div>
    </>
  );
};
