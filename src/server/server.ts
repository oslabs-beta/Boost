import express, { Request, Response, NextFunction } from "express";
import { ServerError } from "../types";

const PORT: number = 3000;

const app = express();

app.use(express.json);

app.use(express.urlencoded({ extended: true }));

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultError: ServerError = {
    log: "Express caught an unknown middleware error",
    status: 500,
    message: { err: "an error has occured" },
  };
  const errorObj: ServerError = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.send(errorObj.status).json(errorObj.message);
});

app.listen(PORT, (): void => {
  console.log(`server listening on port: ${PORT}`);
});

module.exports = app;
