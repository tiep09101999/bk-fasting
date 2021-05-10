const socket = io.connect("http://localhost:8000");

function countDown(timelimit, timepassed, timeStart, notice) {
  // Credit: Mateusz Rybczonec

  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;
  let notification = "";
  let notification2 = "";
  const COLOR_CODES = {
    info: {
      color: "green",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  };
  if (notice == "fasting") {
    if (new Date(timeStart).getHours() < 10) {
      hours = "0" + new Date(timeStart).getHours();
    } else {
      hours = new Date(timeStart).getHours();
    }
    if (new Date(timeStart).getMinutes() < 10) {
      minutes = "0" + new Date(timeStart).getMinutes();
    } else {
      minutes = new Date(timeStart).getMinutes();
    }

    let timestart = hours + ":" + minutes;

    //let timePassed = timelimit - timeleft;
    let timePassed = timepassed;
    // biến timeTmp để tính khi vòng tròn lặp lại
    let timeTmp = timePassed % timelimit;

    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    startTimer();

    function onTimesUp() {
      clearInterval(timerInterval);
    }

    function startTimer() {
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        // timeTmp dùng để xác định tỉ lệ time / timelimit
        timeTmp = timePassed % timelimit;
        setCircleDasharray();
        // phát tín hiệu cho server nhận thời gian trôi qua

        // document.getElementById("countDown__timeStart").innerHTML =
        //   "bắt đầu vào lúc";
        // document.getElementById("countDown__subtitle").innerHTML =
        //   "Đang nhịn ăn";
        socket.emit("time-passed-level", timePassed);
        if (timePassed == timelimit - 60 * 60) {
          socket.emit("push-notification-before-1-hour");
        }
        // đẩy thông báo nhắc user vào khi quá 1 ngày ( 2,3 ngày fasting)
        if ((timePassed - timelimit) % 86400 === 0) {
          let data = (timePassed - timelimit) / 86400;
          socket.emit("push-notification-after-fasting-1-day", data);
        }

        document.getElementById("base-timer-label").innerHTML = formatTime(
          timePassed
        );
        // khi vượt quá mục tiêu, hiện time
        if (timePassed > timelimit) {
          // khoảng thời gian vượt quá thời gian kết thúc nhịn ăn dự kiến
          let overcomeTime = timePassed - timelimit;
          const { warning, info } = COLOR_CODES;
          document.getElementById("countDown__timeStart").innerHTML =
            "vượt quá mục tiêu ";
          document.getElementById(
            "countDown__numberStart"
          ).innerHTML = formatTime(overcomeTime);
          document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
          document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
        }
        // khi nhận đc thông báo đang trong quá trình feeding window ( đã end fasting )
      }, 1000);
    }
    document.getElementById("app").innerHTML = `
      <div class="base-timer">
      <div class="countDown__subtitle" id="countDown__subtitle">Đang nhịn ăn</div> 
      <div class="countDown__timeStart" id="countDown__timeStart">bắt đầu vào lúc</div>
      <div class="countDown__numberStart" id="countDown__numberStart">${timestart}</div>
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
              id="base-timer-path-remaining"
              stroke-dasharray="0 283"
              class="base-timer__path-remaining ${remainingPathColor}"
              d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
              "
          ></path>
          </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${formatTime(
      timePassed
    )}</span>
      </div>
      `;
    function formatTime(time) {
      let hours = Math.floor(time / 3600);
      time = time % 3600;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${hours}:${minutes}:${seconds}`;
    }

    function calculateTimeFraction() {
      const rawTimeFraction = timeTmp / timelimit;
      return rawTimeFraction + (1 / timelimit) * (1 - rawTimeFraction);
    }
    function setCircleDasharray() {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }
  } else if (notice == "feeding") {
    let timePassed = timepassed;
    // biến timeTmp để tính khi vòng tròn lặp lại
    let timeTmp = timePassed % timelimit;

    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;
    let nd = new Date(timeStart);
    nd.setHours(nd.getHours() + timelimit / 3600);
    timeStart = nd.toLocaleString();
    startTimer();

    function onTimesUp() {
      clearInterval(timerInterval);
    }

    function startTimer() {
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        // timeTmp dùng để xác định tỉ lệ time / timelimit
        timeTmp = timePassed % timelimit;
        setCircleDasharray();
        document.getElementById("base-timer-label").innerHTML = formatTime(
          timePassed
        );
        if (timePassed === timelimit) {
          // gửi thông báo cho user đã hết khoảng thời gian ăn uống
          socket.emit("finish-time-feeding-window");
        }
        // khi nhận đc thông báo đang trong quá trình feeding window ( đã end fasting )

        // document.getElementById("countDown__timeStart").innerHTML =
        //   "đợt nhịn ăn tiếp theo bắt đầu lúc";
        // document.getElementById("countDown__subtitle").innerHTML =
        //   "đợt nhịn ăn gần nhất cách đây";

        // khi vượt quá thời gian feeding mục tiêu, quay lại fasting plan có sẵn
        if (timePassed > timelimit) {
          // khoảng thời gian vượt quá thời gian kết thúc nhịn ăn dự kiến

          const { warning, info } = COLOR_CODES;
          document.getElementById("countDown__timeStart").innerHTML = "";
          document.getElementById("countDown__numberStart").innerHTML = "";

          document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
          document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
        }
      }, 1000);
    }
    document.getElementById("app").innerHTML = `
    <div class="base-timer">
    <div class="countDown__subtitle" id="countDown__subtitle">Lần nhịn ăn gần nhất cách</div> 
    <div class="countDown__timeStart" id="countDown__timeStart">Đợt nhịn ăn tiếp theo</div>
    <div class="countDown__numberStart" id="countDown__numberStart">${timeStart}</div>
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="0 283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
      timePassed
    )}</span>
    </div>
    `;
    function formatTime(time) {
      let hours = Math.floor(time / 3600);
      time = time % 3600;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${hours}:${minutes}:${seconds}`;
    }

    function calculateTimeFraction() {
      const rawTimeFraction = timeTmp / timelimit;
      return rawTimeFraction + (1 / timelimit) * (1 - rawTimeFraction);
    }
    function setCircleDasharray() {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }
  } else if (notice == "custom-wait") {
    if (new Date(timeStart).getHours() < 10) {
      hours = "0" + new Date(timeStart).getHours();
    } else {
      hours = new Date(timeStart).getHours();
    }
    if (new Date(timeStart).getMinutes() < 10) {
      minutes = "0" + new Date(timeStart).getMinutes();
    } else {
      minutes = new Date(timeStart).getMinutes();
    }

    let timestart = hours + ":" + minutes;

    //let timePassed = timelimit - timeleft;
    let timePassed = timepassed;
    // biến timeTmp để tính khi vòng tròn lặp lại

    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    startTimer();

    function onTimesUp() {
      clearInterval(timerInterval);
    }

    function startTimer() {
      timerInterval = setInterval(() => {
        timePassed = timePassed -= 1;
        // timeTmp dùng để xác định tỉ lệ time / timelimit

        setCircleDasharray();

        if (timePassed == 0) {
          socket.emit("push-notification-start-fasting-custom-plan");
          location.reload();
        }

        document.getElementById("base-timer-label").innerHTML = formatTime(
          timePassed
        );

        // khi nhận đc thông báo đang trong quá trình feeding window ( đã end fasting )
      }, 1000);
    }
    document.getElementById("app").innerHTML = `
      <div class="base-timer">
      <div class="countDown__subtitle" id="countDown__subtitle">Còn lại</div> 
      <div class="countDown__timeStart" id="countDown__timeStart"> sẽ bắt đầu vào lúc</div>
      <div class="countDown__numberStart" id="countDown__numberStart">${timestart}</div>
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
              id="base-timer-path-remaining"
              stroke-dasharray="0 283"
              class="base-timer__path-remaining ${remainingPathColor}"
              d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
              "
          ></path>
          </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${formatTime(
      timePassed
    )}</span>
      </div>
      `;
    function formatTime(time) {
      let hours = Math.floor(time / 3600);
      time = time % 3600;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${hours}:${minutes}:${seconds}`;
    }

    function calculateTimeFraction() {
      const rawTimeFraction = timePassed / timelimit;
      return rawTimeFraction + (1 / timelimit) * (1 - rawTimeFraction);
    }
    function setCircleDasharray() {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }
  } else {
    if (new Date(timeStart).getHours() < 10) {
      hours = "0" + new Date(timeStart).getHours();
    } else {
      hours = new Date(timeStart).getHours();
    }
    if (new Date(timeStart).getMinutes() < 10) {
      minutes = "0" + new Date(timeStart).getMinutes();
    } else {
      minutes = new Date(timeStart).getMinutes();
    }

    let timestart = hours + ":" + minutes;

    //let timePassed = timelimit - timeleft;
    let timePassed = timepassed;
    // biến timeTmp để tính khi vòng tròn lặp lại
    let timeTmp = timePassed % timelimit;

    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    startTimer();

    function onTimesUp() {
      clearInterval(timerInterval);
    }

    function startTimer() {
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        // timeTmp dùng để xác định tỉ lệ time / timelimit
        timeTmp = timePassed % timelimit;
        setCircleDasharray();
        socket.emit("time-passed-level", timePassed);
        // phát tín hiệu cho server nhận thời gian trôi qua

        // document.getElementById("countDown__timeStart").innerHTML =
        //   "bắt đầu vào lúc";
        // document.getElementById("countDown__subtitle").innerHTML =
        //   "Đang nhịn ăn";
        // đẩy thông báo nhắc user vào khi quá 1 ngày ( 2,3 ngày fasting)
        if ((timePassed - timelimit) % 86400 === 0) {
          let data = (timePassed - timelimit) / 86400;
          socket.emit("push-notification-after-fasting-1-day", data);
        }
        document.getElementById("base-timer-label").innerHTML = formatTime(
          timePassed
        );
        // khi vượt quá mục tiêu, hiện time
        if (timePassed > timelimit) {
          document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
          document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
        }
        // khi nhận đc thông báo đang trong quá trình feeding window ( đã end fasting )
      }, 1000);
    }
    document.getElementById("app").innerHTML = `
      <div class="base-timer">
      <div class="countDown__subtitle" id="countDown__subtitle">Đang nhịn ăn</div> 
      <div class="countDown__timeStart" id="countDown__timeStart">bắt đầu vào lúc</div>
      <div class="countDown__numberStart" id="countDown__numberStart">${timestart}</div>
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
              id="base-timer-path-remaining"
              stroke-dasharray="0 283"
              class="base-timer__path-remaining ${remainingPathColor}"
              d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
              "
          ></path>
          </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${formatTime(
      timePassed
    )}</span>
      </div>
      `;
    function formatTime(time) {
      let hours = Math.floor(time / 3600);
      time = time % 3600;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${hours}:${minutes}:${seconds}`;
    }

    function calculateTimeFraction() {
      const rawTimeFraction = timeTmp / timelimit;
      return rawTimeFraction + (1 / timelimit) * (1 - rawTimeFraction);
    }
    function setCircleDasharray() {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }
  }
}

//let timePassed = timelimit - timeleft;
// countDown(7200, 7195, 5, "fasting");
// khi ấn nút kết thúc Fasting

// bắt sự kiện user online để tính thời gian đã countUp khi vẫn đang fasting
socket.emit("user-online");
socket.on("req-user-online", (data) => {
  countDown(data.timelimit, data.timePassed, data.chooseAt, data.notice);
  //countDown(7200, 93595, 5, "fasting");
  //countDown(7200, 7195, 6, "feeding");
});

// bắt sự kiện user online để tính thời gian đã countUp khi  đang feeding window
