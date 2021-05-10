const express = require("express");
const router = express.Router();
const passport = require("passport");
const initPassportFb = require("../controller/passportController");
const initPassportLocal = require("../controller/passportLocalController");
const authController = require("../controller/authController");
const homeController = require("../controller/homeController");
const planController = require("../controller/planController");
const webpushController = require("../controller/webpushController");
const foodController = require("../controller/foodController");

const TimeLineModel = require("../model/timeline");
const formatDate = require("../helper/formatDate");
const authValid = require("../helper/authValidation");

// init login with fb
initPassportFb();
//login with local
initPassportLocal();

router
  // .get("/example", (req, res) => {
  //   res.render("example", { title: "ejs" });
  // })
  .get("/", authController.checkLoggedIn, homeController.getHome)
  .post(
    "/register",
    authController.checkLoggedOut,
    authValid.register,
    authController.postRegister
  )
  .get(
    "/verify/:token",
    authController.checkLoggedOut,
    authController.verifyAccount
  )
  .get("/countup", authController.checkLoggedIn, homeController.getCountUp)

  .get("/register", authController.checkLoggedOut, (req, res) => {
    res.render("register", {
      errors: req.flash("errors"),
      success: req.flash("success")
    });
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
    res.render("login", {
      errors: req.flash("errors"),
      success: req.flash("success")
    });
  })
  .post(
    "/login-local",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  )
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
  })
  // web-push
  .post(
    "/subscribe",
    authController.checkLoggedIn,
    webpushController.handleSubcription
  )
  .get("/food-form", authController.checkLoggedIn, foodController.getFoodForm)
  .post("/category/food", authController.checkLoggedIn, foodController.getFoodsByCategory)
  .post("/food-form", authController.checkLoggedIn, foodController.addFoodToForm)
  .delete("/food-form/:id", authController.checkLoggedIn, foodController.deleteFoodToForm)
  .put("/user/calo", authController.checkLoggedIn, foodController.updateCaloTargetUser);

module.exports = router;
