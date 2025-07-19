import express from "express";
import { databaseConnect } from "./database/dbconnection.js";
import router from "./routes/route.js";

const app = express();
app.use("/api", router);
app.use(express.json());

databaseConnect("zone", "postgres", "root");

app.listen(8080, () => {
  console.log("Server is running on 8080!");
});
