const plans = [{
    img: `assets/images/plan_card1.jpg`,
    icon: "assets/icon-lock.svg",
    title: "Kế hoạch hàng tuần",
    dataTitle: "Kế hoạch hàng tuần",
    class: "one",
    subtitle: "Người bắt đầu",
    datasubTitle: "Người bắt đầu",
    desc: "Bỏ qua một bữa ăn mỗi ngày",
    dataDesc: "Bỏ qua một bữa ăn mỗi ngày",
    url: "#",

},
{
    img: `assets/images/plan_card2.jpg`,
    icon: "assets/icon-lock.svg",
    title: "Kế hoạch hàng tuần",
    dataTitle: "Kế hoạch hàng tuần",
    class: "two",
    subtitle: "Trung gian",
    datasubTitle: "Trung gian",
    desc: "Chỉ ăn một bữa mỗi ngày",
    dataDesc: "Chỉ ăn một bữa mỗi ngày",
    url: "#",
},
{
    img: `assets/images/plan_card3.jpg`,
    icon: "assets/icon-lock.svg",
    title: "Kế hoạch hàng tuần",
    dataTitle: "Kế hoạch hàng tuần",
    class: "three",
    subtitle: "Nâng cao",
    datasubTitle: "Nâng cao",
    desc: "Ăn nhanh cả ngày",
    dataDesc: "Ăn nhanh cả ngày",
    url: "#",
},
{
    img: `assets/images/plan_card4.jpg`,
    icon: "assets/icon-lock.svg",
    title: "Kế hoạch hàng tuần",
    dataTitle: "Kế hoạch hàng tuần",
    class: "four",
    subtitle: "Autophagy",
    datasubTitle: "Autophagy",
    desc: "Giải độc và tái tạo tế bào",
    dataDesc: "Giải độc và tái tạo tế bào",
    url: "#",
},
];

const planSlider = {
    title: "Kế hoạch",
    subtitle: "Far far away, behind the word mountains.",
    button: "Xem tất cả",
    url: "#"
};

// Module Template

function templateplanSlider() {
    let template = `
        <div class="planSlider__wrapper">
            <div class="planSlider__heading">
                <h3 class="planSlider__title anime">${planSlider.title}</h3>
                <h4 class="planSlider__subtitle anime">${planSlider.subtitle}</h4>
            </div>
            <div class="planSlider__sliderContainer">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>

                <div class="planSlider__slider swiper-container">
                    <div class="swiper-wrapper">
                    </div>
                </div>
            </div>
            <!--<div class="ctaContainer anime">
                <a href="${planSlider.url}" class="cta white">${planSlider.button}</a>
            </div>-->
        </div>`;
    document.querySelectorAll(".planSlider").forEach(function (el) {
        el.insertAdjacentHTML("beforeend", template);
    });
}

templateplanSlider();

// Slider
plans.forEach(function (el) {
    let templateSlider = `
    <div class="swiper-slide anime">
        <a class="planSlider__card ${el.class}" href="${el.url}" data-subtitle="${el.datasubTitle}" data-title="${el.dataTitle}" data-desc="${el.dataDesc}">
            <figure class="planSlider__image">
                <img src="${el.img}" alt="${el.alt}">
            </figure>
            <div class="planSlider__icon ${el.class}">
                <img src="${el.icon}" alt="">   
            </div>
            <div class="planSlider__text">
                <h4 class="planSlider__planTitle ${el.class}">${el.title}</h4>
                <h5 class="planSlider__planSubtitle">${el.subtitle}</h5>
                <p class="planSlider__planDesc">${el.desc}</p>
            </div>
        </a>
    </div>`;
    document.querySelectorAll(".planSlider .swiper-wrapper").forEach(function (el) {
        el.insertAdjacentHTML("beforeend", templateSlider);
    });
});

var mySwiper = new Swiper('.planSlider__slider.swiper-container', {
    // Optional parameters
    loop: true,
    speed: 500,
    slidesPerView: 4,
    spaceBetween: 32,
    breakpoints: {
        1023: {
            slidesPerView: 4,
        },
        799: {
            spaceBetween: 24,
            slidesPerView: 3,
        },
        511: {
            spaceBetween: 24,
            slidesPerView: 2,
        },
        0: {
            spaceBetween: 24,
            slidesPerView: 1,
        }

    },

    // If we need pagination
    pagination: {
        el: '.planSlider .swiper-pagination',
    },
    // Navigation arrows
    navigation: {
        nextEl: '.planSlider .swiper-button-next',
        prevEl: '.planSlider .swiper-button-prev',
    },
});




function openModalPlan() {
    const planLink = document.querySelectorAll('.planSlider__card.one'),
        modalPlan = document.querySelector('.modal.plan'),
        iconClosePlan = document.querySelector('.modal__icon.plan'),
        subTitle = document.querySelector('.plan .modal__plansubTitle'),
        title = document.querySelector('.plan .modal__planTitle'),
        desc = document.querySelector('.plan .modal__planDesc');

    planLink.forEach(function (el) {
        el.addEventListener("click", openPlan);
    })

    iconClosePlan.addEventListener("click", closePlan);

    function openPlan(e) {
        const subTitleSrc = e.currentTarget.dataset.subtitle,
            titleSrc = e.currentTarget.dataset.title,
            descSrc = e.currentTarget.dataset.desc;

        subTitle.innerHTML = subTitleSrc;
        title.innerHTML = titleSrc;
        desc.innerHTML = descSrc;
        modalPlan.classList.add('open');
        document.querySelector('body').style.overflow = "hidden";
    }

    function closePlan() {
        modalPlan.classList.remove('open');
        subTitle.innerHTML = "";
        title.innerHTML = "";
        desc.innerHTML = "";
        document.querySelector('body').style.overflow = "initial";
    }
}

openModalPlan();

function openModalDetail() {
    const detailLink = document.querySelectorAll('.modal__card'),
        modalDetail = document.querySelector('.modal.detail'),
        iconCloseDetail = document.querySelector('.modal__icon.detail'),
        subTitle = document.querySelector('.detail .modal__detailsubTitle'),
        title = document.querySelector('.detail .modal__detailTitle'),
        desc = document.querySelector('.detail .modal__detailDesc'),
        hour1 = document.querySelector('.modal__detailTimerItem.one span'),
        hour2 = document.querySelector('.modal__detailTimerItem.two span');

    detailLink.forEach(function (el) {
        el.addEventListener("click", openDetail);
    })

    iconCloseDetail.addEventListener("click", closeDetail);

    function openDetail(e) {
        const subTitleSrc = e.currentTarget.dataset.subtitle,
            titleSrc = e.currentTarget.dataset.title,
            descSrc = e.currentTarget.dataset.desc,
            hour1Src = e.currentTarget.dataset.subtitle2,
            hour2Src = e.currentTarget.dataset.subtitle3;

        subTitle.innerHTML = subTitleSrc;
        title.innerHTML = titleSrc;
        desc.innerHTML = descSrc;
        hour1.innerHTML = hour1Src;
        hour2.innerHTML = hour2Src;
        modalDetail.classList.add('open');
        document.querySelector('body').style.overflow = "hidden";
    }

    function closeDetail() {
        modalDetail.classList.remove('open');
        subTitle.innerHTML = "";
        title.innerHTML = "";
        desc.innerHTML = "";
        hour1.innerHTML = "";
        hour2.innerHTML = "";
        document.querySelector('body').style.overflow = "initial";
    }
}

openModalDetail();

