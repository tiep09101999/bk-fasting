const subscriptionModel = require("../model/subscription");
const Objecthash = require("object-hash");
const webPush = require("web-push");
module.exports.handleSubcription = async (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  // mã hóa subscription
  let hash = Objecthash(subscription);

  // check xem co trong db chua
  let checkSub = await subscriptionModel.findSub(hash);
  if (!checkSub) {
    let item = {
      userId: req.user._id,
      subscriptionId: hash,
      subscription: subscription,
      createdAt: Date.now(),
    };
    let newSub = await subscriptionModel.createNew(item);
    const payload = JSON.stringify({
      title: "Push notifications with Service Workers",
      body: "Welcome to my app",
    });

    // const payload = {
    //   title: "Push notifications with Service Workers",
    // };
    webPush
      .sendNotification(subscription, payload)
      .catch((error) => console.error(error));
  }
};

module.exports.notiBefore1Hour = async (req, res) => {
  let sub = await subscriptionModel.findLastSub(req.user._id);
  const payload = JSON.stringify({
    title: "Sắp đến giờ rồi !!",
    body: "Còn 1 tiếng nữa là đến giờ ăn uống rồii",
  });
  webPush.sendNotification(sub, payload).catch((error) => console.error(error));
};
