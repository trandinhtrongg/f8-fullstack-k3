const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.querySelector(".progress");
const progressDot = progress.children[0];
const audio = document.querySelector(".audio");
const btnPlay = document.querySelector(".play-btn");
const progressTime = progressBar.querySelector(".progress-time");
let runTime = progressBar.previousElementSibling;
let totalTime = progressBar.nextElementSibling;
let currentValue = 0;

const getSongTime = function (seconds) {
  let minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${
    seconds < 10 ? `0${seconds}` : `${seconds}`
  }`;
};

//lấy chiều dài progress bar
const progressBarWidth = progressBar.clientWidth;
//Đặt cờ is Mount down
let isMountDown = false;
let progressBarDistance = 0;
const handleValue = function (value) {
  currentValue = value;
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }
  progress.style.width = `${value}%`;
};
//change run time ()
const changeRunTime = function (value) {
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }
  let seconds = (value * audio.duration) / 100;
  if (seconds < 0) {
    seconds = 0;
  }
  runTime.innerText = getSongTime(seconds);
};
//hàm change progress width
const changeProgressWidth = function (e) {
  let offsetX = e.clientX - progressBarDistance;
  let value = (offsetX * 100) / progressBarWidth;
  handleValue(value);
  changeRunTime(value);
};
//hàm change progress time
progressBar.addEventListener("mouseout", function () {
  progressTime.style.visibility = "hidden";
});
const changeProgressTime = function (e) {
  progressTime.style.visibility = "visible";
  let seconds = (e.offsetX / progressBarWidth) * audio.duration;
  progressTime.innerText = getSongTime(seconds);
  progressTime.style.left = `${e.offsetX}px`;
};

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    progressBarDistance = e.clientX - e.offsetX;
    changeProgressWidth(e);
    changeProgressTime(e);
    isMountDown = true;
  }
});
progressDot.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  if (e.which === 1) {
    if (progressBarDistance === 0 && currentValue === 0) {
      progressBarDistance = e.clientX;
    } else {
      progressBarDistance = e.clientX - (currentValue * progressBarWidth) / 100;
    }
    changeProgressWidth(e);
    isMountDown = true;
  }
});
document.addEventListener("mousemove", function (e) {
  if (isMountDown) {
    changeProgressWidth(e);
  }
});
progressBar.addEventListener("mousemove", function (e) {
  e.stopPropagation();
  if (isMountDown) {
    changeProgressWidth(e);
    changeProgressTime(e);
  } else {
    changeProgressTime(e);
  }
});
progressDot.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});

document.addEventListener("mouseup", function () {
  audio.currentTime = (currentValue * audio.duration) / 100;
  isMountDown = false;
});

//wait audio load
audio.addEventListener("loadeddata", function (e) {
  totalTime.innerText = getSongTime(audio.duration);
});
audio.addEventListener("timeupdate", function (e) {
  if (!isMountDown) {
    runTime.innerText = getSongTime(audio.currentTime);
    value = (audio.currentTime * 100) / audio.duration;
    handleValue(value);
  }
  if (audio.ended) {
    btnPlay.children[1].classList.remove("active");
    btnPlay.children[0].classList.add("active");
    value = 0;
    handleValue(0);
    runTime.innerText = getSongTime(0);
  }
});

btnPlay.addEventListener("click", function () {
  if (audio.paused) {
    btnPlay.children[1].classList.add("active");
    btnPlay.children[0].classList.remove("active");
    audio.play();
  } else {
    btnPlay.children[1].classList.remove("active");
    btnPlay.children[0].classList.add("active");
    audio.pause();
  }
});
