require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routers
app.use("/api", require("./routers/authRouter"));
app.use("/api", require("./routers/userRouter"));

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log("server is running on port: ", port);
});
