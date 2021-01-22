const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const initRoutes = require("./router/index");
const connectDB = require("./config/connectDb");
const cookieParser = require("cookie-parser");
const initSockets = require("./socket/index");
const expressExtend = require("express-ejs-extend");

const { configSocketio } = require("./config/socketio");
const { configSession, sessionStore } = require("./config/session");

const passport = require("passport");
require("dotenv/config");
const app = express();
let server = http.createServer(app);
const io = require("socket.io")(server);

// config view ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.engine("ejs", expressExtend);

// conect MongoDB
connectDB();

// config session de luu vao DB
configSession(app);

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
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

server.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
