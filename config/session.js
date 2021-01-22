const session = require("express-session");

const connectMongo = require("connect-mongo");
require("dotenv").config();

let mongoStore = connectMongo(session);

// Biến sesionStore là nơi lưu Session (mongoDB)

let sessionStore = new mongoStore({
  url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  autoReconnect: true,
  // autoRemove: "native"  ( xóa sau 1 ngày, default của connect-mongo)
});
// app chinh la app trong server.js

let configSession = (app) => {
  app.use(
    session({
      key: "express.sid",
      secret: "mySecret",
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
};

module.exports = {
  configSession: configSession,
  sessionStore: sessionStore,
};
