const path = require("path");
const express = require("express");
const PORT = 3000;

/* global console module, require */

const app = express();

app.use(express.json);

app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express caught an unknown middleware error",
    status: 500,
    message: { err: "an error has occured" },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.send(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});

module.exports = app;
