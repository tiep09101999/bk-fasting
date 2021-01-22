module.exports.formatDate = (date) => {
  let nd = new Date(date);
  console.log(nd);
  let rs = "";
  let month = nd.getMonth() + 1;
  let minutes = nd.getMinutes();
  let day = nd.getDate();
  let hours = nd.getHours();
  if (day < 10) {
    day = "0" + nd.getDate();
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hours < 10) {
    hours = "0" + nd.getHours();
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  rs = day + "/" + month + "  " + hours + ":" + minutes;

  return rs;
};
