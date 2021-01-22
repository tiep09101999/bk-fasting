const express = require("express");
const router = express.Router();
const PlanModel = require("../model/plan");
const UserModel = require("../model/user");
const TimeLineModel = require("../model/timeline");

router.put("/choose", async (req, res) => {
  try {
    let uid = req.body.uid;

    let userId = req.user._id;
    let plan = await PlanModel.model.findPlanById(uid);
    // req.user.toObject();
    req.user.plan = {
      isChoose: true,
      name: plan.planName,
      planId: plan._id,
      chooseAt: new Date(),
      isEndFasting: false,
    };
    let data = {
      fastHours: plan.fastHours,
      eatHours: plan.eatHours,
    };

    let updateUser = await UserModel.updateUser(userId, req.user);
    //console.log(updateUser);
    return res.status(200).send({ plan: data, user: req.user, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.put("/updateWaterDrunk", async (req, res) => {
  try {
    let data = req.body.waterDrunk;
    let userId = req.user._id;
    req.user.plan.water.waterDrunk = data;
    let updateUser = await UserModel.updateUser(userId, req.user);
    return res.status(200).send({ plan: data, user: req.user, success: true });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/updateWaterAmount", async (req, res) => {
  try {
    let data = req.body.waterAmount;
    let userId = req.user._id;
    req.user.plan.water.waterAmount = data;
    let updateUser = await UserModel.updateUser(userId, req.user);
    return res.status(200).send({ plan: data, user: req.user, success: true });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/choose-dif-plan", async (req, res) => {
  try {
    let userId = req.user._id;
    req.user.plan.isChoose = false;
    let updateUser = await UserModel.updateUser(userId, req.user);
    return res.status(200).send({ user: req.user, success: true });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post("/addTimeLine", async (req, res) => {
  try {
    let dateStart = req.body.dateStart;
    let dateEnd = req.body.dateEnd;
    let dateDif = dateEnd - dateStart;
    let timeFasting =
      parseInt(dateDif / (1000 * 3600)) +
      " giờ " +
      (parseInt(dateDif / (1000 * 60)) % 60) +
      " phút ";
    let data = {
      userId: req.user._id,
      timeStart: dateStart,
      timeEnd: dateEnd,
      totalFastHours: timeFasting,
      planName: req.user.plan.name,
      takeNote: req.body.takeNote,
      waterDrunk: req.body.waterDrunk,
    };

    let newItem = await TimeLineModel.createNew(data);
    // cập nhật thông tin user
    //req.user.plan.isChoose = false;
    req.user.plan.chooseAt = Date.now();
    req.user.plan.water.waterDrunk = 0;
    req.user.plan.water.waterAmount = 300;
    req.user.plan.isEndFasting = true;
    req.user.cumulative += parseInt(parseInt(dateDif / (1000 * 3600)));
    req.user.totalFastingDays += parseInt(
      parseInt(dateDif / (1000 * 3600 * 24))
    );
    req.user.continuous =
      req.user.continuous > parseInt(parseInt(dateDif / (1000 * 3600 * 24)))
        ? req.user.continuous
        : parseInt(parseInt(dateDif / (1000 * 3600 * 24)));
    req.user.longestFast =
      req.user.longestFast > parseInt(dateDif / (1000 * 3600))
        ? req.user.longestFast
        : parseInt(dateDif / (1000 * 3600 * 24));
    let updateUser = await UserModel.updateUser(req.user._id, req.user);
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
module.exports = router;
