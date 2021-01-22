const sliderAboutItems = [
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.1",
    time: "0 - 2h",
    min: 0,
    title: "Blood Suger Raises",
    desc:
      "You'll feel pretty normal during the fist hours of fasting because your body is going through the regular process of breaking down glycogen. Your blood sugar rises. Your pancreas releases insulin to break down glucose for energy and stores the extra glucose for later.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.2",
    time: "2h - 5h",
    min: 7200,
    title: "Blood Suger Falls",
    desc:
      "As a result of the effects of insulin, your blood sugar decreases to near normal after spiking. And it typically doesn't continue climbing because insulin is immediately delivered into your circulatory system after eating",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.3",
    time: "5h - 8h",
    min: 18000,
    title: "Glycogen Reserve Drops",
    desc:
      "Feeling hungry? Your stomach is reminding you that it's been a while since your last meal; however, you're not actually that hungry. <br/><br/> " +
      " Starve to death? Shrivel up and lose your muscle mass? None of this is going to happen. " +
      " Actually, your glycogen reserves will begin to fall, and you might even lose a little body fat. <br/><br/> " +
      " Your body will continue to digest your last food intake. It starts to use stored glocuse for energy, and continues to function as if you will eat again soon. ",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.4",
    time: "8h - 10h",
    min: 28800,
    title: "Gluconeogenesis",
    desc:
      "8 hours after your last meal, your liver will use up the last of its glucose reserves. Now your body goes into a state called gluconeogenesis, which indicates that your body has switched into the fasting mode. <br/><br/> Studies show that gluconeogenesis, a metabolic pathway, results in the generation of glucose from body fat instead of carbohydrates. It increases your calorie burning.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.5",
    time: "10h - 12h",
    min: 36000,
    title: "Little Glycongen Left",
    desc:
      "Your glycogen reserves are running out! As a result, you may become irrtable or hangry. Just relax, it's a sign that your body is burning fat! <br/><br/> With little glycogen left, fat cells will release fat into your bloodstream. They also go straight into your liver and are converted into energy for your body. Actually, you are cheating your body into burning fat in order to survive.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.6",
    time: "12h - 18h",
    min: 43200,
    title: "Ketosis State",
    desc:
      " Now it's the turn of fat to fuel your body. you're in the metabolic state called ketosis. " +
      "  The glycogen is almost used up and your liver converts fat into ketone bodies - an alternative energy source for your body. <br/><br/> " +
      " Fat reserves are readily released and consumed. For this reason, ketosis is sometimes referred to as the body's " +
      '"fat-burning" mode.' +
      " Ketosis produces fewer inflammatory by-products, so it provides health benefits to your heart, metabolism and brain.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.7",
    time: "18h - 24h",
    min: 64800,
    title: "Burn Fat",
    desc:
      "The longer you fast, the deeper into ketosis you'll go. By 18 hours, your body has switched into fat-burning mode. Research shows that after fasting for 12 to 25 hours, the energy supply from fat will increase by 60%, and it has a significant increase after 18 hours. Now: <br/><br/> 1.The level of ketone bodies rises. <br/> 2. Ketones act as signaling molecules to tell your body how to better regulate its metabolism in a stressful enviroment. <br/> 3. Your body's anti-inflammatory and rejuvenation processed are ready to work.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.8",
    time: "24h - 48h",
    min: 86400,
    title: "Autophagy",
    desc:
      "At this point, your body triggers autophagy (literally means " +
      '"self-devouring")' +
      ". Cells start to clean up their house. they remove unnecessary of dysfunctional components. It's a good thing because it allows the orderly degradation and recycling of cellular components. <br/><br/> During autophagy, cells break down viruses, bacteria and damaged components. In this process, you get the energy to make new cell parts. It's significant for cell's health, renewal, and survival. The main benefit of autophagy is best known as the body turning the clock back and creating younger cells.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.9",
    time: "48h - 56h",
    min: 172800,
    title: "Growth Hormone Goes Up",
    desc:
      "Your growth hormone level is much higher than the level at which it was before fasting. This benefits from the ketone bodies production and hunger hormone secretion during fasting. Growth hormone helps increase your lean muscle mass and improve your cardiovascular health.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.10",
    time: "56h - 72h",
    min: 201600,
    title: "Sensitive to Insulin",
    desc:
      "Your insulin is at its lowest level since fasting. It makes you more insulin sensitive, which is an especially good thing if you have a high risk of developing diabetes. <br/><br/> Lowering your insulin levels has a range of health benefits both short term and long term, such as activating autophagy and reducing inflammation.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.11",
    time: "> 72h",
    min: 259200,
    title: "Immune Cells Regenerate",
    desc:
      '"Survival of the fittest."' +
      " Your body turns down cellular survival pathways and recycles immune cells that are damaged when fighting viruses, bacteria, and germs. <br/>" +
      "In order to fill " +
      '"the vacancy of the guardians"' +
      ", your body regenerates new immunce cells at a rapid pace. " +
      " It starts the immune system regeneratin and shifts cells to a state of self-renewal. Your immune system becomes stronger and stronger. <br/>" +
      " Scientists are still studying on COVID 19, any medicines and treatments should be taken under the guidance of the doctor. <br/> " +
      " If you feel uncomfortable, you should immediately stop fasting and consult your doctor. <br/> " +
      "     Fasting is a healthy lifestyle, it should be carried out under good physical conditions",
  },
];
window.addEventListener("load", (event) => {
  // open Modal dualBlock

  const dualBlock = document.querySelector(".dualBlock__block.one"),
    modalDualBlock = document.querySelector(".modal.dualBlock"),
    iconCloseDualBlock = document.querySelector(".dualBlock .modal__icon"),
    body = document.querySelector("body");

  dualBlock.addEventListener("click", openModalDualBlock);

  iconCloseDualBlock.addEventListener("click", closeModalDualBlock);

  function openModalDualBlock() {
    modalDualBlock.classList.add("open");
    modalDualBlock.style.overflow = "hidden";
    dualBlock.style.visibility = "hidden";

    if (window.innerWidth < 799) {
      body.style.overflow = "hidden";
    }
  }

  function closeModalDualBlock() {
    modalDualBlock.classList.remove("open");

    modalDualBlock.style.overflow = "visible";
    dualBlock.style.visibility = "visible";

    if (window.innerWidth < 799) {
      body.style.overflow = "visible";
    }
  }

  // open Modal Symptom

  const symptom = document.querySelector(".symptom"),
    modalSymptom = document.querySelector(".modal.symptom"),
    iconCloseSymptom = document.querySelector(".symptom .modal__icon");

  symptom.addEventListener("click", openModalSymptom);

  iconCloseSymptom.addEventListener("click", closeModalSymptom);

  function openModalSymptom() {
    modalSymptom.classList.add("open");
    modalSymptom.style.overflow = "hidden";
    symptom.style.visibility = "hidden";

    if (window.innerWidth < 799) {
      body.style.overflow = "hidden";
    }
  }

  function closeModalSymptom() {
    modalSymptom.classList.remove("open");

    modalSymptom.style.overflow = "visible";
    symptom.style.visibility = "visible";

    if (window.innerWidth < 799) {
      body.style.overflow = "visible";
    }
  }

  // open Modal Drink

  const drink = document.querySelector(".cta.drink"),
    modalDrink = document.querySelector(".modal.drink"),
    iconCloseDrink = document.querySelector(".drink .modal__icon");

  drink.addEventListener("click", openModalDrink);

  iconCloseDrink.addEventListener("click", closeModalDrink);

  function openModalDrink() {
    modalDrink.classList.add("open");
    modalDrink.style.overflow = "hidden";
    symptom.style.visibility = "hidden";

    if (window.innerWidth < 799) {
      body.style.overflow = "hidden";
    }
  }

  function closeModalDrink() {
    modalDrink.classList.remove("open");

    modalDrink.style.overflow = "visible";
    symptom.style.visibility = "visible";

    if (window.innerWidth < 799) {
      body.style.overflow = "visible";
    }
  }

  // open Modal Swap

  const swap = document.querySelector(".modal__drinkSwap"),
    modalSwap = document.querySelector(".modal.swap"),
    iconCloseSwap = document.querySelector(".swap .modal__icon");
  closeCup = document.querySelectorAll(".modal__cup");

  swap.addEventListener("click", openModalSwap);

  iconCloseSwap.addEventListener("click", closeModalSwap);
  closeCup.forEach(function (el) {
    el.addEventListener("click", closeCupModal);
  });

  function openModalSwap() {
    modalSwap.classList.add("open");
    modalSwap.style.overflow = "hidden";

    if (window.innerWidth < 799) {
      body.style.overflow = "hidden";
    }
  }

  function closeModalSwap() {
    modalSwap.classList.remove("open");

    modalSwap.style.overflow = "visible";

    if (window.innerWidth < 799) {
      body.style.overflow = "visible";
    }
  }

  function closeCupModal(e) {
    //var currentCup = e.currentTarget;
    modalSwap.classList.remove("open");
  }

  // open Modal End Fasting

  const endFasting = document.querySelector("#btnEndFasting"),
    btnDeleteFasting = document.querySelector(".btnDeleteFasting"),
    btnSaveFasting = document.querySelector("#btnSaveFasting"),
    modalEndFasting = document.querySelector(".modal.endFasting"),
    iconCloseEndFasting = document.querySelector(".endFasting .modal__icon");

  endFasting.addEventListener("click", openModalEndFasting);

  iconCloseEndFasting.addEventListener("click", closeModalEndFasting);
  // khi ấn lưu lại và xóa bỏ thì sẽ đóng modal lại
  btnDeleteFasting.addEventListener("click", closeModalEndFasting);
  btnSaveFasting.addEventListener("click", closeModalEndFasting);

  function openModalEndFasting() {
    modalEndFasting.classList.add("open");
    modalEndFasting.style.overflow = "hidden";

    if (window.innerWidth < 799) {
      body.style.overflow = "hidden";
    }
  }

  function closeModalEndFasting() {
    modalEndFasting.classList.remove("open");

    modalEndFasting.style.overflow = "visible";

    if (window.innerWidth < 799) {
      body.style.overflow = "visible";
    }
  }

  // active Card Icon End Fasting

  // Modal Level

  function openModalSlider2() {
    const cardLink = document.querySelectorAll(".countDown__level"),
      modalSlider = document.querySelector(".modal.slider2"),
      iconCloseSlider = document.querySelector(".modal__icon.slider2");

    cardLink.forEach(function (el) {
      el.addEventListener("click", openSlider);
    });

    iconCloseSlider.addEventListener("click", closeSlider);

    function openSlider(e) {
      modalSlider.classList.add("open");
      document.querySelector("body").style.overflow = "hidden";
    }

    function closeSlider() {
      modalSlider.classList.remove("open");
      document.querySelector("body").style.overflow = "initial";
    }
  }

  openModalSlider2();

  /********************************/
  // Content Media - About

  function contentMedia2() {
    sliderAboutItems.forEach(function (el) {
      let templateSlider = `
                <div class="swiper-slide">
                    <figure class="contentMedia__image anime">
                        <img src="assets/images/default2.jpg" alt="${el.alt}">
                    </figure>
                    <div class="contentMedia__content">
                        <div class="contentMedia__levelName">${el.level}</div>
                        <h2 class="contentMedia__title two">${el.title}</h2>
                        <div class="contentMedia__levelTime"><div class="contentMedia__levelImage"><img src="assets/icon-clock.svg" alt=""></div>${el.time}</div>
                        <p class="contentMedia__desc">${el.desc}</p>
                    </div>
                </div>`;
      document
        .querySelector(".contentMedia.about2 .swiper-wrapper")
        .insertAdjacentHTML("beforeend", templateSlider);
    });

    var mySwiper = new Swiper(".contentMedia__slider2.swiper-container", {
      // Optional parameters
      loop: true,
      speed: 500,

      // If we need pagination
      pagination: {
        el: ".contentMedia.about2 .swiper-pagination",
        clickable: "true",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".contentMedia.about2 .swiper-button-next",
        prevEl: ".contentMedia.about2 .swiper-button-prev",
      },
    });
  }

  contentMedia2();
});
socket.on("req-time-passed-level", (data) => {
  for (let i = sliderAboutItems.length - 1; i >= 0; i--) {
    if (data > sliderAboutItems[i].min) {
      let htmlContent = `
        <div class="countDown__image">
          <img src="${sliderAboutItems[i].img}" alt="" />
        </div>
        <b>${sliderAboutItems[i].level}</b>
        <div class="countDown__levelTitle">${sliderAboutItems[i].title}</div>
        <div class="countDown__iconArrow"></div>
      `;
      $(".countDown__level").html("");
      $(".countDown__level").append(htmlContent);
      break;
    }
  }
});
