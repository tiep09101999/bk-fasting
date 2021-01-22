const express = require("express");
const router = express.Router();
const passport = require("passport");
const initPassportFb = require("../controller/passportController");
const authController = require("../controller/authController");
const homeController = require("../controller/homeController");
const planController = require("../controller/planController");
const PlanModel = require("../model/plan");
const UserModel = require("../model/user");
const TimeLineModel = require("../model/timeline");
const formatDate = require("../helper/formatDate");
// init login with fb
initPassportFb();

router
  .get("/", authController.checkLoggedIn, homeController.getHome)
  .get("/countup", authController.checkLoggedIn, async (req, res) => {
    if (!req.user.plan.isChoose) res.redirect("/");

    let nd = new Date(req.user.plan.chooseAt);
    let plan = await PlanModel.model.findPlanById(req.user.plan.planId);
    nd.setHours(nd.getHours() + plan.fastHours);
    let newDate = new Date(nd);
    // lấy định dạng HH:MM lúc bắt đầu

    res.render("countdown_home", {
      user: req.user,
      newDate: newDate,
    });
  })

  .get("/register", authController.checkLoggedOut, (req, res) => {
    res.render("register");
  })
  .get("/learn", authController.checkLoggedIn, (req, res) => {
    res.render("learn", { user: req.user });
  })
  .get("/plan", authController.checkLoggedIn, planController.getWeekPlan)
  .get("/mine", authController.checkLoggedIn, async (req, res) => {
    let lastedTimeLine = await TimeLineModel.getLastedTimeLineByUserId(
      req.user._id
    );
    res.render("mine", {
      user: req.user,
      lastedTimeLine: lastedTimeLine,
      formatDate: formatDate.formatDate,
    });
  })
  .get("/timeline", authController.checkLoggedIn, async (req, res) => {
    let allTimeLines = await TimeLineModel.getAllTimelineByUserId(req.user._id);
    res.render("timeline", {
      user: req.user,
      allTimeLines: allTimeLines,
      formatDate: formatDate.formatDate,
    });
  })
  .get("/login", authController.checkLoggedOut, (req, res) => {
    res.render("login");
  })
  .get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  )
  .get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  )
  .get("/logout", authController.checkLoggedIn, (req, res) => {
    req.logout();
    res.redirect("/login");
  });
module.exports = router;
