import React from "react";

export default () => {
  const onSubmit = () => {
    console.log("submit was clicked");
    // document.getElementById('sqlQueryBox').value;
  };

  return (
    <>
      <textarea id="sqlQueryBox" placeholder="Enter SQL Query"></textarea>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
};
