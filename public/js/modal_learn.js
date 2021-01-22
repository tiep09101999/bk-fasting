
function openModalText() {
    const textLink = document.querySelectorAll('.learn__link'),
        modalText = document.querySelector('.modal.text'),
        iconCloseText = document.querySelector('.modal__icon.text'),
        subTitle = document.querySelector('.text .modal__subTitle'),
        title = document.querySelector('.text .modal__title'),
        desc = document.querySelector('.text .modal__desc');

    textLink.forEach(function (el) {
        el.addEventListener("click", openText);
    })

    iconCloseText.addEventListener("click", closeText);

    function openText(e) {
        const subTitleSrc = e.currentTarget.dataset.subtitle,
            titleSrc = e.currentTarget.dataset.title,
            descSrc = e.currentTarget.dataset.desc;

        subTitle.innerHTML = subTitleSrc;
        title.innerHTML = titleSrc;
        desc.innerHTML = descSrc;
        modalText.classList.add('open');
        document.querySelector('body').style.overflow = "hidden";
    }

    function closeText() {
        modalText.classList.remove('open');
        subTitle.innerHTML = "";
        title.innerHTML = "";
        desc.innerHTML = "";
        document.querySelector('body').style.overflow = "initial";
    }
}

openModalText();


function openModalSlider() {
    const cardLink = document.querySelectorAll('.learn__cardItem.one'),
        modalSlider = document.querySelector('.modal.slider'),
        iconCloseSlider = document.querySelector('.modal__icon.slider');

    cardLink.forEach(function (el) {
        el.addEventListener("click", openSlider);
    })

    iconCloseSlider.addEventListener("click", closeSlider);

    function openSlider(e) {
        modalSlider.classList.add('open');
        document.querySelector('body').style.overflow = "hidden";
    }

    function closeSlider() {
        modalSlider.classList.remove('open');
        document.querySelector('body').style.overflow = "initial";
    }
}

openModalSlider();

function openModalSlider2() {
    const cardLink = document.querySelectorAll('.learn__cardItem.two'),
        modalSlider = document.querySelector('.modal.slider2'),
        iconCloseSlider = document.querySelector('.modal__icon.slider2');

    cardLink.forEach(function (el) {
        el.addEventListener("click", openSlider);
    })

    iconCloseSlider.addEventListener("click", closeSlider);

    function openSlider(e) {
        modalSlider.classList.add('open');
        document.querySelector('body').style.overflow = "hidden";
    }

    function closeSlider() {
        modalSlider.classList.remove('open');
        document.querySelector('body').style.overflow = "initial";
    }
}

openModalSlider2();

/********************************/
// Content Media - About

function contentMedia() {
    const sliderAboutItems = [{
            img: `assets/images/default1.jpg`,
            alt: " ",
            title: "COVID-19 and nhịn ăn",
            desc: "Tôi có thể nhịn ăn trong đại dịch COVID-19 không?  Nó có lành mạnh và an toàn không?",
        },
        {
            img: `assets/images/default1.jpg`,
            alt: " ",
            title: "COVID-19 and nhịn ăn",
            desc: "Các nhà khoa học vẫn đang nghiên cứu về COVID 19, bất kỳ loại thuốc và phương pháp điều trị nào cũng nên được thực hiện dưới sự hướng dẫn của bác sĩ.",
        },
        {
            img: `assets/images/default1.jpg`,
            alt: " ",
            title: "COVID-19 and nhịn ăn",
            desc: "Nếu cảm thấy khó chịu, bạn nên ngừng ngay việc nhịn ăn và hỏi ý kiến ​​bác sĩ.",
        },
        {
            img: `assets/images/default1.jpg`,
            alt: " ",
            title: "COVID-19 and nhịn ăn",
            desc: "Ăn chay là một lối sống lành mạnh, cần được thực hiện trong điều kiện thể chất tốt.",
        },
    ];


    sliderAboutItems.forEach(function (el) {
        let templateSlider = `
            <div class="swiper-slide">
                <figure class="contentMedia__image anime">
                    <img src="${el.img}" alt="${el.alt}">
                </figure>
                <div class="contentMedia__content">
                    <h2 class="contentMedia__title">${el.title}</h2>
                    <p class="contentMedia__desc">${el.desc}</p>
                </div>
            </div>`;
        document.querySelector(".contentMedia.about .swiper-wrapper").insertAdjacentHTML("beforeend", templateSlider);

    });

    var mySwiper = new Swiper('.contentMedia__slider.swiper-container', {
        // Optional parameters
        loop: true,
        speed: 500,

        // If we need pagination
        pagination: {
            el: '.contentMedia.about .swiper-pagination',
            clickable: 'true'
        },

        // Navigation arrows
        navigation: {
            nextEl: '.contentMedia.about .swiper-button-next',
            prevEl: '.contentMedia.about .swiper-button-prev',
        },
    });


};

contentMedia();

/********************************/
// Content Media - About

function contentMedia2() {
    const sliderAboutItems = [{
            img: `assets/images/default2.jpg`,
            alt: " ",
            title: "Làm thế nào để giữ sức khỏe trong COVID-19?",
            desc: "Dưới đây là một số gợi ý nếu bạn đang ăn ở nhà trong thời kỳ đại dịch.",
        },
        {
            img: `assets/images/default2.jpg`,
            alt: " ",
            title: "Tiếp tục nhịn ăn",
            desc: "Nhịn ăn trong thời gian ngắn có thể làm tăng tỷ lệ trao đổi chất của bạn bởi nhịn ăn sẽ hướng bạn đến một lối sống mới với những thói quen lành mạnh",
        },
        {
            img: `assets/images/default2.jpg`,
            alt: " ",
            title: "Trong thời kỳ ăn uống của bạn",
            desc: "Ăn thực phẩm giàu thực phẩm có nguồn gốc thực vật, đặc biệt là rau lá và trái cây",
        },
        {
            img: `assets/images/default2.jpg`,
            alt: " ",
            title: "Trong thời kỳ ăn uống của bạn",
            desc: "Cắt bỏ các thực phẩm gây viêm nhiễm như đường và chất béo xấu. Tập thể dục có thể giúp tăng cường hệ thống miễn dịch của bạn và kiểm soát cân nặng tại nhà.",
        },
    ];


    sliderAboutItems.forEach(function (el) {
        let templateSlider = `
            <div class="swiper-slide">
                <figure class="contentMedia__image anime">
                    <img src="${el.img}" alt="${el.alt}">
                </figure>
                <div class="contentMedia__content">
                    <h2 class="contentMedia__title two">${el.title}</h2>
                    <p class="contentMedia__desc">${el.desc}</p>
                </div>
            </div>`;
        document.querySelector(".contentMedia.about2 .swiper-wrapper").insertAdjacentHTML("beforeend", templateSlider);

    });

    var mySwiper = new Swiper('.contentMedia__slider2.swiper-container', {
        // Optional parameters
        loop: true,
        speed: 500,

        // If we need pagination
        pagination: {
            el: '.contentMedia.about2 .swiper-pagination',
            clickable: 'true'
        },

        // Navigation arrows
        navigation: {
            nextEl: '.contentMedia.about2 .swiper-button-next',
            prevEl: '.contentMedia.about2 .swiper-button-prev',
        },
    });


};

contentMedia2();