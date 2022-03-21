import React from "react";

export default () => {
  const onSubmit = () => {
    console.log('submit was clicked'); 
  }

  return (
    <>
      <textarea>Enter SQL Query</textarea> 
      <button onClick={onSubmit}>Submit</button> 
    </>
  )
    
}