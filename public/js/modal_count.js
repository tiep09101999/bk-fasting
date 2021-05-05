const sliderAboutItems = [
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.1",
    time: "0 - 2h",
    min: 0,
    title: "Tăng lượng đường trong máu",
    desc:
      "Bạn sẽ cảm thấy khá bình thường trong những giờ nhịn ăn vì cơ thể bạn đang trải qua quá trình phá vỡ glycogen thường xuyên. Lượng đường trong máu của bạn tăng lên. Tuyến tụy của bạn tiết ra insulin để phân hủy glucose thành năng lượng và dự trữ lượng glucose bổ sung cho sau này",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.2",
    time: "2h - 5h",
    min: 7200,
    title: "Hạ lượng đường trong máu",
    desc:
      " Do tác dụng của insulin, lượng đường trong máu của bạn giảm xuống gần mức bình thường sau khi tăng đột biến. Và nó thường không tiếp tục leo núi vì insulin ngay lập tức được đưa vào hệ thống tuần hoàn của bạn sau khi ăn",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.3",
    time: "5h - 8h",
    min: 18000,
    title: "Dự trữ Glycogen",
    desc:
      "Bạn có cảm thấy đói? Dạ dày của bạn đang nhắc nhở bạn rằng đã lâu rồi kể từ bữa ăn cuối cùng của bạn; tuy nhiên, bạn không thực sự đói như vậy. <br/><br/> " +
      " Kiệt sức vì đói? Làm mất khối lượng cơ bắp của bạn? Không có điều này sẽ xảy ra. " +
      "Trên thực tế, dự trữ glycogen của bạn sẽ bắt đầu giảm, và bạn thậm chí có thể giảm một chút mỡ trong cơ thể. <br/><br/> " +
      " Cơ thể bạn sẽ tiếp tục tiêu hóa lượng thức ăn cuối cùng của bạn. Nó bắt đầu sử dụng glocuse dự trữ để làm năng lượng, và tiếp tục hoạt động như thể bạn sẽ sớm ăn trở lại. ",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.4",
    time: "8h - 10h",
    min: 28800,
    title: "Gluconeogenesis",
    desc:
      "8 giờ sau bữa ăn cuối cùng của bạn, gan của bạn sẽ sử dụng hết lượng glucose dự trữ cuối cùng. Lúc này cơ thể bạn chuyển sang trạng thái gọi là gluconeogenesis, điều này cho thấy cơ thể bạn đã chuyển sang chế độ nhịn ăn. <br/> <br/> Các nghiên cứu cho thấy gluconeogenesis, một con đường trao đổi chất, dẫn đến việc tạo ra glucose từ chất béo trong cơ thể thay vì carbohydrate. Nó làm tăng lượng calo đốt cháy của bạn.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.5",
    time: "10h - 12h",
    min: 36000,
    title: "Lượng dự trữ glycogen sắp hết",
    desc:
      "Dự trữ glycogen của bạn sắp hết! Kết quả là, bạn có thể trở nên khó chịu hoặc nôn nao. Chỉ cần thư giãn, đó là dấu hiệu cho thấy cơ thể bạn đang đốt cháy chất béo! <br/> <br/> Khi còn lại ít glycogen, các tế bào mỡ sẽ giải phóng chất béo vào máu của bạn. Chúng cũng đi thẳng vào gan của bạn và được chuyển hóa thành năng lượng cho cơ thể. Trên thực tế, bạn đang lừa dối cơ thể đốt cháy chất béo để tồn tại.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.6",
    time: "12h - 18h",
    min: 43200,
    title: "Trạng thái Ketosis",
    desc:
      " Bây giờ đến lượt chất béo để cung cấp năng lượng cho cơ thể bạn. bạn đang ở trạng thái chuyển hóa được gọi là ketosis. " +
      " Glycogen gần như được sử dụng hết và gan của bạn sẽ chuyển hóa chất béo thành thể xeton - một nguồn năng lượng thay thế cho cơ thể bạn. <br/><br/> " +
      " Chất béo dự trữ dễ dàng được giải phóng và tiêu thụ. Vì lý do này, ketosis đôi khi được gọi là cơ thể " +
      'chế độ "đốt cháy chất béo".' +
      "  Ketosis tạo ra ít sản phẩm phụ gây viêm hơn, vì vậy nó mang lại lợi ích sức khỏe cho tim, sự trao đổi chất và não của bạn.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.7",
    time: "18h - 24h",
    min: 64800,
    title: "Đốt cháy chất béo",
    desc:
      "Bạn nhịn ăn càng lâu, bạn sẽ càng đi sâu vào trạng thái ketosis. Đến 18 giờ, cơ thể bạn đã chuyển sang chế độ đốt cháy chất béo. Nghiên cứu cho thấy sau khi nhịn ăn từ 12 đến 25 giờ, năng lượng cung cấp từ chất béo sẽ tăng 60%, và nó có sự gia tăng đáng kể sau 18 giờ. Bây giờ: <br/> <br/> 1. Mức độ cơ thể xeton tăng lên. <br/> 2. Xeton hoạt động như các phân tử báo hiệu cho cơ thể bạn biết cách điều chỉnh sự trao đổi chất tốt hơn trong môi trường căng thẳng. <br/> 3. Quá trình chống viêm và trẻ hóa cơ thể của bạn đã sẵn sàng hoạt động.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.8",
    time: "24h - 48h",
    min: 86400,
    title: "Autophagy",
    desc:
      "Tại thời điểm này, cơ thể bạn kích hoạt autophagy (nghĩa đen là" +
      '"self-devouring")' +
      ". Các tế bào bắt đầu dọn dẹp ngôi nhà của họ. họ loại bỏ các thành phần không cần thiết của chức năng. Đó là một điều tốt vì nó cho phép phân hủy và tái chế có trật tự các thành phần tế bào. <br/> <br/> Trong quá trình autophagy, các tế bào sẽ phá vỡ vi rút, vi khuẩn và các thành phần bị hư hỏng. Trong quá trình này, bạn nhận được năng lượng để tạo ra các bộ phận tế bào mới. Nó có ý nghĩa đối với sức khỏe, sự đổi mới và sự tồn tại của tế bào. Lợi ích chính của autophagy được biết đến nhiều nhất là cơ thể quay ngược đồng hồ và tạo ra các tế bào trẻ hơn.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.9",
    time: "48h - 56h",
    min: 172800,
    title: "Hormone tăng trưởng tăng lên",
    desc:
      "Mức độ hormone tăng trưởng của bạn cao hơn nhiều so với mức trước khi nhịn ăn. Điều này có lợi từ việc cơ thể sản xuất xeton và tiết ra hormone đói khi nhịn ăn. Hormone tăng trưởng giúp tăng khối lượng cơ nạc và cải thiện sức khỏe tim mạch của bạn.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.10",
    time: "56h - 72h",
    min: 201600,
    title: "Nhạy cảm với Insulin",
    desc:
      "Insulin của bạn đang ở mức thấp nhất kể từ khi nhịn ăn. Nó làm cho bạn nhạy cảm hơn với insulin, đây là một điều đặc biệt tốt nếu bạn có nguy cơ mắc bệnh tiểu đường cao. <br/> <br/> Giảm mức insulin mang lại nhiều lợi ích cho sức khỏe cả ngắn hạn và dài hạn, chẳng hạn như kích hoạt chế độ tự động thở và giảm viêm.",
  },
  {
    img: `assets/icon-leaf.svg`,
    alt: " ",
    level: "Lv.11",
    time: "> 72h",
    min: 259200,
    title: "Tái tạo tế bào miễn dịch",
    desc:
      '"Sự sống sót của những người khỏe mạnh nhất."' +
      " Cơ thể của bạn từ chối các con đường tồn tại của tế bào và tái chế các tế bào miễn dịch bị tổn thương khi chống lại vi rút, vi khuẩn và vi trùng. <br/>" +
      "Để lấp vào " +
      '"vị trí tuyển dụng của những người bảo vệ"' +
      ", cơ thể bạn tái tạo các tế bào non mới với tốc độ nhanh chóng. " +
      "Nó bắt đầu tái tạo hệ thống miễn dịch và chuyển các tế bào sang trạng thái tự đổi mới. Hệ thống miễn dịch của bạn ngày càng trở nên mạnh mẽ hơn. <br/>" +
      " Các nhà khoa học vẫn đang nghiên cứu về COVID 19, mọi loại thuốc và phương pháp điều trị cần được thực hiện dưới sự hướng dẫn của bác sĩ. <br/> " +
      " Nếu cảm thấy khó chịu, bạn nên ngừng nhịn ăn ngay lập tức và hỏi ý kiến ​​bác sĩ. <br/> " +
      "     Ăn chay là một lối sống lành mạnh, cần được thực hiện trong điều kiện thể chất tốt",
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

  $("#btnEndFastingCustom")
    .off("click")
    .on("click", function () {
      let dataEnd = Date.now();
      let timeChoose = $(this).data("time");
      if (dataEnd < timeChoose) {
        let dataEnd = Date.now();
        let timeChoose = $(this).data("time");
        if (dataEnd < timeChoose) {
          console.log("test");
          Swal.fire({
            title:
              "Chưa đến thời gian nhịn ăn, bạn có chắc chắn muốn kết thúc?",
            text: "Dữ liệu sẽ không được lưu",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có",
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax({
                url: "/delete-end-fasting",
                method: "put",

                success: function (data) {
                  console.log(data);
                  if (data.success) {
                    location.reload();
                  }
                },
              });
            }
          });
        }
      } else {
        openModalEndFasting();
      }
    });
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

  // open endFasting Input
  function openEndFastingInput() {
    const iconEdit = document.querySelector(".modal__endFastingClose"),
      endFastingInput = document.querySelector(".modal__endFastingInput");

    iconEdit.addEventListener("click", openInput);

    function openInput() {
      if (endFastingInput.classList.contains("open")) {
        endFastingInput.classList.remove("open");
      } else {
        endFastingInput.classList.add("open");
      }
    }
  }

  openEndFastingInput();
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
