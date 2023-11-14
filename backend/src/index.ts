import express, { Request, Response } from "express";

const server = express();

server.get("/", (req: Request, res: Response) => {
  return res.send("Hello World!");
});

server.listen(4000, () => {
  console.log("Server is running");
});
