var carousel = document.querySelector(".carousel");
var carouselInner = carousel.querySelector(".carousel-inner");
var carouselNav = carousel.querySelector(".carousel-nav");

var navNext = carouselNav.querySelector(".next");
var navPrev = carouselNav.querySelector(".prev");
var carouselDots = carousel.querySelector(".carousel-dots");

//bước 1: tính số lượng ảnh

var carouselItems = carouselInner.querySelectorAll(".item");

if (carouselItems.length) {
  //xử lý
  // lấy chiều rộng item

  var itemWidth = carouselInner.clientWidth; // trả về chiều rộng của element

  var totalWidth = itemWidth * carouselItems.length; // tổng chiều rộng các item

  carouselInner.style.width = `${totalWidth}px`; // cập nhật css cho carousel-inner

  carouselItems.forEach(function (items, index) {
    items.style.width = `${itemWidth}px`;
    var dotsHTML = `<span class="dot ${
      index === 0 ? "active" : ""
    } " dot-index = "${index}"></span>`;
    carouselDots.innerHTML += dotsHTML;
  });
  var dotItems = carouselDots.querySelectorAll(".dot");

  var moveToSlide = function (index) {
    currentIndex = index;
    position = -itemWidth * currentIndex;
    carouselInner.style.translate = `${position}px`;
    activeDot(currentIndex);
  };

  var activeDot = function (index) {
    dotItems.forEach(function (item, dotIndex) {
      if (index === dotIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
      item.addEventListener("click", function () {
        moveToSlide(dotIndex);
      });
    });
  };
  activeDot(0);
}

// xử lý chuyển slide khi click vào next
var position = 0;
var currentIndex = 0;

navNext.addEventListener("click", function () {
  if (Math.abs(position) < totalWidth - itemWidth) {
    position -= itemWidth;
    carouselInner.style.translate = `${position}px`;
    currentIndex++;
    activeDot(currentIndex);
  }
});

navPrev.addEventListener("click", function () {
  if (position < 0) {
    position += itemWidth;
    carouselInner.style.translate = `${position}px`;
    currentIndex--;
    activeDot(currentIndex);
  }
});

// carouselDots
