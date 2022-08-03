class Carousel {
  constructor(p) {
    const s = {
      ...{
        containerId: "#carousel",
        slideId: ".slides__item",
        interval: 2000,
        isPlaying: true,
      },
      ...p,
    };

    this.container = document.querySelector(s.containerId);
    this.slides = this.container.querySelectorAll(s.slideId);
    this.interval = s.interval;
    this.isPlaying = s.isPlaying;
  }

  _initProps() {
    this.currentSlide = 0;

    this.SLIDE_LENGTH = this.slides.length;
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-chevron-left"></i>';
    this.FA_NEXT = '<i class="fas fa-chevron-right"></i>';
  }

  _initControls() {
    let controls = document.createElement("div");
    const PAUSE = `<span id="pause-btn" class="controls__pause">
                        <span id="fa-pause-circle">${this.FA_PAUSE}</span>
                        <span id="fa-play-circle">${this.FA_PLAY}</span>
                    </span>`;
    const PREV = `<span class="controls__item controls__prev" id="prev">${this.FA_PREV}</span>`;
    const NEXT = `<span class="controls__item controls__next" id="next">${this.FA_NEXT}</span>`;

    controls.setAttribute("class", "controls");
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector(".controls__pause");
    this.prevBtn = this.container.querySelector(".controls__prev");
    this.nextBtn = this.container.querySelector(".controls__next");

    this.pauseIcon = this.container.querySelector(".fa-pause-circle");
    this.playIcon = this.container.querySelector(".fa-play-circle");

    this.isPlaying ? this._pauseVisible() : this._playVisible();
  }

  _initIndicators() {
    let indicators = document.createElement("div");
    indicators.setAttribute("class", "indicators");

    for (let i = 0, n = this.SLIDE_LENGTH; i < n; i++) {
      let indicator = document.createElement("div");
      indicator.setAttribute(
        "class",
        i !== 0 ? "indicators__item" : "indicators__item active"
      );

      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indicatorContainer = this.container.querySelector(".indicators");
    this.indicators = this.container.querySelectorAll(".indicators__item");
  }

  _initListeners() {
    document.addEventListener("keydown", this._pressKey.bind(this));
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));

    this.indicatorContainer.addEventListener(
      "click",
      this._indicate.bind(this)
    );
    this.container.addEventListener("mouseenter", this._pause.bind(this));
    this.container.addEventListener("mouseleave", this._play.bind(this));
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDE_LENGTH) % this.SLIDE_LENGTH;
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  _pause() {
    if (this.isPlaying) {
      this._playVisible();
      this.isPlaying = false;
      clearInterval(this.timerID);
    }
  }

  _play() {
    if (!this.isPlaying) {
      this._pauseVisible();
      this.isPlaying = true;
      this._tick();
    }
  }

  _indicate(e) {
    let target = e.target;

    if (target && target.classList.contains("indicators__item")) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

  _pauseVisible(isVisible = true) {
    this.pauseIcon.style.opacity = isVisible ? 1 : 0;
    this.playIcon.style.opacity = !isVisible ? 1 : 0;
  }

  _playVisible() {
    this._pauseVisible(false);
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  next() {
    this._pause();
    this._gotoNext();
  }

  prev() {
    this._pause();
    this._gotoPrev();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  }
}

export default Carousel;
