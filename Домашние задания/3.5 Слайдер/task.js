const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
const prevArrow = document.querySelector('.slider__arrow_prev');
const nextArrow = document.querySelector('.slider__arrow_next');
const sliderDots = Array.from(document.querySelectorAll('.slider__dot'));

let currentSlideIndex = 0;

// Убрать активное состояние со старого слайда
function deactivateCurrentSlide() {
  sliderItems[currentSlideIndex].classList.remove('slider__item_active');

  if (sliderDots.length > 0) {
    sliderDots[currentSlideIndex].classList.remove('slider__dot_active');
  }
}

// Переключить активное состояние для нового слайда
function activateCurrentSlide() {
  sliderItems[currentSlideIndex].classList.add('slider__item_active');

  if (sliderDots.length > 0) {
    sliderDots[currentSlideIndex].classList.add('slider__dot_active');
  }
}

// Переключение слайдера
function showSlide(slideIndex) {
  deactivateCurrentSlide();

  currentSlideIndex = slideIndex;

  activateCurrentSlide();
}

// Возврат индекс следующего слайда
function getNextSlideIndex() {
  if (currentSlideIndex === sliderItems.length - 1) {
    return 0;
  }

  return currentSlideIndex + 1;
}

// Возврат индекс предыдущего слайда
function getPrevSlideIndex() {
  if (currentSlideIndex === 0) {
    return sliderItems.length - 1;
  }

  return currentSlideIndex - 1;
}

// Переключение вправо
function showNextSlide() {
  showSlide(getNextSlideIndex());
}

// Переключение влево
function showPrevSlide() {
  showSlide(getPrevSlideIndex());
}

// Регистрирация обработки слайдов и точек
function registerArrowHandlers() {
  prevArrow.addEventListener('click', showPrevSlide);
  nextArrow.addEventListener('click', showNextSlide);
}

function registerDotHandlers() {
  sliderDots.forEach((sliderDot, index) => {
    sliderDot.addEventListener('click', () => {
      showSlide(index);
    });
  });
}



// Slider init
function initSlider() {
  activateCurrentSlide();
  registerArrowHandlers();
  registerDotHandlers();
}

initSlider();
