// Burke Academic Review — article data and page behavior.
//
// TO ADD AN ARTICLE: copy one of the objects in the ARTICLES array below,
// paste it in, and fill in the fields. That's it — the carousel, the
// "Trending" sidebar, and the discipline tabs below all pull from this
// same list automatically.
//
//   title      - the article's title
//   author     - author name, e.g. "Jane Smith, College '27"
//   discipline - must be exactly one of: Philosophy, History, Science,
//                Politics, Law
//   date       - "YYYY-MM-DD" — controls sort order (newest first) and
//                which articles appear in "Featured" and "Trending"
//   excerpt    - a one- or two-sentence summary
//   link       - URL to the full article (a Google Doc, PDF, etc.), or
//                null if it's not posted online yet
//   trending   - true to flag it as a Trending pick in the sidebar

document.addEventListener("DOMContentLoaded", function () {
  var ARTICLES = [
    { title: "Article Title — Politics I", author: "Author Name", discipline: "Politics", date: "2026-10-30", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: true },
    { title: "Article Title — Science I", author: "Author Name", discipline: "Science", date: "2026-10-28", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: true },
    { title: "Article Title — Philosophy I", author: "Author Name", discipline: "Philosophy", date: "2026-10-25", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: true },
    { title: "Article Title — History I", author: "Author Name", discipline: "History", date: "2026-10-18", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: true },
    { title: "Article Title — Law I", author: "Author Name", discipline: "Law", date: "2026-10-12", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: true },
    { title: "Article Title — Science II", author: "Author Name", discipline: "Science", date: "2026-09-30", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: false },
    { title: "Article Title — Philosophy II", author: "Author Name", discipline: "Philosophy", date: "2026-09-10", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: false },
    { title: "Article Title — Politics II", author: "Author Name", discipline: "Politics", date: "2026-09-05", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: false },
    { title: "Article Title — History II", author: "Author Name", discipline: "History", date: "2026-08-22", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: false },
    { title: "Article Title — Law II", author: "Author Name", discipline: "Law", date: "2026-08-15", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: false },
    { title: "Article Title — Philosophy III", author: "Author Name", discipline: "Philosophy", date: "2026-07-20", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: false },
    { title: "Article Title — History III", author: "Author Name", discipline: "History", date: "2026-07-02", excerpt: "A one- or two-sentence summary of the article's argument goes here.", link: null, trending: false }
  ];

  var carouselTrack = document.getElementById("review-carousel-track");
  var carouselEl = document.getElementById("review-carousel");
  if (!carouselTrack || !carouselEl) return;

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function byDateDesc(a, b) {
    return new Date(b.date) - new Date(a.date);
  }

  function articleLinkHTML(a) {
    if (a.link) {
      return '<a href="' + a.link + '" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Read Article</a>';
    }
    return '<span class="placeholder">EDIT ME: article link</span>';
  }

  // ---- Carousel: the most recent articles, newest first ----
  var carouselDots = document.getElementById("review-carousel-dots");
  var carouselIndex = 0;
  var carouselItems = ARTICLES.slice().sort(byDateDesc).slice(0, 5);

  function updateCarouselPosition() {
    carouselTrack.style.transform = "translateX(-" + carouselIndex * 100 + "%)";
    var dots = carouselDots.querySelectorAll(".carousel-dot");
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("active", i === carouselIndex);
    }
  }

  function goToSlide(i) {
    carouselIndex = (i + carouselItems.length) % carouselItems.length;
    updateCarouselPosition();
  }

  function renderCarousel() {
    carouselTrack.innerHTML = carouselItems.map(function (a) {
      return (
        '<div class="carousel-slide">' +
          '<div class="article-thumb"><span>' + a.discipline + '</span></div>' +
          '<div class="carousel-slide-body">' +
            '<span class="tag">Featured</span>' +
            '<h2>' + a.title + '</h2>' +
            '<p class="byline">' + a.author + ' &middot; ' + formatDate(a.date) + '</p>' +
            '<p>' + a.excerpt + '</p>' +
            '<p style="margin-top:20px;">' + articleLinkHTML(a) + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    carouselDots.innerHTML = carouselItems.map(function (_, i) {
      return '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>';
    }).join("");
  }

  renderCarousel();

  document.getElementById("review-carousel-prev").addEventListener("click", function () {
    goToSlide(carouselIndex - 1);
  });
  document.getElementById("review-carousel-next").addEventListener("click", function () {
    goToSlide(carouselIndex + 1);
  });
  carouselDots.addEventListener("click", function (e) {
    if (e.target.matches(".carousel-dot")) {
      goToSlide(parseInt(e.target.getAttribute("data-index"), 10));
    }
  });

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion && carouselItems.length > 1) {
    var autoplay = setInterval(function () {
      goToSlide(carouselIndex + 1);
    }, 7000);
    carouselEl.addEventListener("mouseenter", function () {
      clearInterval(autoplay);
    });
  }

  // ---- Trending sidebar ----
  var trendingList = document.getElementById("review-trending-list");
  var trendingItems = ARTICLES.filter(function (a) { return a.trending; }).sort(byDateDesc).slice(0, 5);
  if (trendingItems.length === 0) {
    trendingItems = ARTICLES.slice().sort(byDateDesc).slice(0, 5);
  }

  trendingList.innerHTML = trendingItems.map(function (a, i) {
    return (
      '<li>' +
        '<span class="trending-rank">' + (i + 1) + '</span>' +
        '<div>' +
          '<h4>' + a.title + '</h4>' +
          '<span class="byline">' + a.discipline + ' &middot; ' + a.author + '</span>' +
        '</div>' +
      '</li>'
    );
  }).join("");

  // ---- Discipline tabs ----
  var tabsEl = document.getElementById("review-tabs");
  var gridEl = document.getElementById("review-article-grid");
  var activeDiscipline = "All";

  function renderGrid() {
    var filtered = activeDiscipline === "All"
      ? ARTICLES.slice()
      : ARTICLES.filter(function (a) { return a.discipline === activeDiscipline; });
    filtered.sort(byDateDesc);

    if (filtered.length === 0) {
      gridEl.innerHTML = '<p class="empty-note">No articles posted in this discipline yet.</p>';
      return;
    }

    gridEl.innerHTML = filtered.map(function (a) {
      return (
        '<div class="article-card">' +
          '<div class="article-thumb"><span>' + a.discipline + '</span></div>' +
          '<div class="article-card-body">' +
            '<h3>' + a.title + '</h3>' +
            '<p class="byline">' + a.author + ' &middot; ' + formatDate(a.date) + '</p>' +
            '<p>' + a.excerpt + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  tabsEl.addEventListener("click", function (e) {
    if (!e.target.matches(".review-tab")) return;
    activeDiscipline = e.target.getAttribute("data-discipline");
    var tabs = tabsEl.querySelectorAll(".review-tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle("active", tabs[i] === e.target);
    }
    renderGrid();
  });

  renderGrid();
});
