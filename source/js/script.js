const body = document.querySelector("body");
const menuButton = body.querySelector(".page-header__toggle");
const mainMenu = body.querySelector(".page-header__main-menu");
const openModalButton = body.querySelector(".banner__btn");
const modal = body.querySelector(".modal");
const modalBg = body.querySelector(".modal-bg");
const modalCLoseButton = modal.querySelector(".modal__close");
const bannerButtons = body.querySelectorAll(".banner__arrow");
const bannerPicture = body.querySelector(".banner picture");
const map = body.querySelector(".map__img");
const pagination = body.querySelector(".banner__pagination");

const images = [
  {
    id: 1,
    srcMob: "/images/banner/banner-mob_1.jpg",
    srcDesk: "/images/banner/banner-desk_1.jpg",
    alt: "banner 1",
  },
  {
    id: 2,
    srcMob: "/images/banner/banner-mob_2.jpg",
    srcDesk: "/images/banner/banner-desk_2.jpg",
    alt: "banner 2",
  },
  {
    id: 3,
    srcMob: "/images/banner/banner-mob_3.jpg",
    srcDesk: "/images/banner/banner-desk_3.jpg",
    alt: "banner 3",
  },
];

let counter = 1;
const MAX_COUNTER = 3;
const MIN_VALUE = 1;
const STEP = 1;

const incCounter = (isInc) => {
  if (isInc) {
    if (counter < MAX_COUNTER) {
      counter += STEP;
    } else {
      counter = STEP;
    }
  } else {
    if (counter > MIN_VALUE) {
      counter -= STEP;
    } else {
      counter = MAX_COUNTER;
    }
  }
};

const changePagination = () => {
  pagination.innerText = counter + " / " + MAX_COUNTER;
};

const changeImages = (index) => {
  incCounter(index);
  changePagination();
  const [source, img] = bannerPicture.children;
  const nextImage = images.find((_, index) => index + 1 === counter);
  source.srcset = nextImage.srcDesk;
  img.src = nextImage.srcMob;
};

bannerButtons.forEach((button, index) =>
  button.addEventListener("click", changeImages)
);

const showMainMenu = () => {
  if (mainMenu.classList.contains("menu-hide")) {
    mainMenu.classList.remove("menu-hide");
    menuButton.classList.add("toggle");
    body.classList.add("blocked");
  } else {
    mainMenu.classList.add("menu-hide");
    menuButton.classList.remove("toggle");
    body.classList.remove("blocked");
  }
};

const closeModal = () => {
  modal.classList.add("modal-hide");
  modalBg.classList.add("modal-hide");
  body.classList.remove("blocked");
  modalCLoseButton.removeEventListener("click", closeModal);
};

const showModal = () => {
  if (modal.classList.contains("modal-hide")) {
    modal.classList.remove("modal-hide");
    modalBg.classList.remove("modal-hide");
  } else {
    modal.classList.add("modal-hide");
    modalBg.classList.add("modal-hide");
  }
  body.classList.add("blocked");
  modalCLoseButton.addEventListener("click", closeModal);
};

menuButton.addEventListener("click", showMainMenu);
openModalButton.addEventListener("click", showModal);
