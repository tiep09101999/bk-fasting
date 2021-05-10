const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const path = require("path");
const initRoutes = require("./router/index");
const connectDB = require("./config/connectDb");
const cookieParser = require("cookie-parser");
const initSockets = require("./socket/index");
const expressExtend = require("express-ejs-extend");
const webpush = require("web-push");
const connectFlash = require("connect-flash");

const { configSocketio } = require("./config/socketio");
const { configSession, sessionStore } = require("./config/session");

const passport = require("passport");
require("dotenv/config");
const app = express();

// config web-push
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails(
  "mailto:ntu16604@gmail.com",
  publicVapidKey,
  privateVapidKey
);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
const io = require("socket.io").listen(server);
// config view ejs
app.set("view engine", "ejs");
app.engine("ejs", expressExtend);

app.set("views", "./views");

// conect MongoDB
connectDB();

// config session de luu vao DB
configSession(app);

app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, "/views")));
app.use(bodyParser.urlencoded({ extended: true }));

// enable flash message ( backend gửi message 1 lần về cho client)
app.use(connectFlash());
app.use(bodyParser.json());
// app.use(morgan("tiny"));

// config passport
app.use(passport.initialize());
app.use(passport.session());

configSocketio(io, cookieParser, sessionStore);
// config router
initRoutes(app);

// config socket
initSockets(io);

// server.listen(process.env.PORT, () => {
//   console.log("Server is running on port " + process.env.PORT);
// });
