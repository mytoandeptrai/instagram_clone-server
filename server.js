require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
const SocketServer = require("./socketServer");
const { ExpressPeerServer } = require("peer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Sockets
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

//Create Peer server
// PeerServer({ port: 3001, path: "/" });
ExpressPeerServer(http, { path: "/" });

//Routers
app.use("/api", require("./routers/authRouter"));
app.use("/api", require("./routers/userRouter"));
app.use("/api", require("./routers/postRouter"));
app.use("/api", require("./routers/commentRouter"));
app.use("/api", require("./routers/notifyRouter"));
app.use("/api", require("./routers/messageRouter"));

//!important
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

connectDB();

http.listen(port, () => {
  console.log("server is running on port: ", port);
});
