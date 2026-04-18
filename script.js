// ===============================
// 금촌교회 청년부 · 디지털 주보
// ===============================

/**
 * ✅ 매주 수정하는 곳 (여기만 바꾸면 됨)
 */
const WEEK_DATA = {
  weekBadge: "2026. 04. 19 (주일)",

  weekSubtitle: "환영합니다.\n금촌교회 청년부입니다.",

  // ✅ 예배 순서
  orderItems: [
    {
      title: "예배의 시작",
      leader: "다같이",
      lines: ["사도신경"],
      accordion: {
        summary: "사도신경 전문 보기",
        content:
`나는 전능하신 아버지 하나님,
천지의 창조주를 믿습니다.
나는 그의 유일하신 아들,
우리 주 예수 그리스도를 믿습니다.
그는 성령으로 잉태되어
동정녀 마리아에게서 나시고,
본디오 빌라도에게 고난을 받아
십자가에 못 박혀 죽으시고,
장사된 지 사흘만에
죽은 자 가운데서 다시 살아나셨으며,
하늘에 오르시어 전능하신 아버지 하나님
우편에 앉아 계시다가,
거기로부터 살아있는 자와
죽은 자를 심판하러 오십니다.
나는 성령을 믿으며,
거룩한 공교회와 성도의 교제와
죄를 용서 받는 것과 몸의 부활과
영생을 믿습니다.
아멘.`
      }
    },
    {
      title: "찬양과 기도",
      leader: "인도자",
      lines: [
        { type: "link", text: "이번 주 찬양 악보 보기", href: "#praise" },
      ],
    },
    {
      title: "성경봉독",
      leader: "다 같이",
      lines: ["히브리서 11:8~10, 16"],
      verse: [
        "8. 믿음으로 아브라함은 부르심을 받았을 때에 순종하여 장래의 유업으로 받을 땅에 나아갈새 갈 바를 알지 못하고 나아갔으며 ",
        "9. 믿음으로 그가 이방의 땅에 있는 것 같이 약속의 땅에 거류하여 동일한 약속을 유업으로 함께 받은 이삭 및 야곱과 더불어 장막에 거하였으니 ",
        "10. 이는 그가 하나님이 계획하시고 지으실 터가 있는 성을 바랐음이라 ",
        "16. 그들이 이제는 더 나은 본향을 사모하니 곧 하늘에 있는 것이라 이러므로 하나님이 그들의 하나님이라 일컬음 받으심을 부끄러워하지 아니하시고 그들을 위하여 한 성을 예비하셨느니라 ",
      ],
    },
    {
      title: "설교",
      leader: "심광일 목사님",
      lines: ["“영원한 나라를 향하다”"],
    },
    {
      title: "축도",
      leader: "심광일 목사님",
      lines: [],
    },

    // ✅ 용어 변경 + 클릭 시 청년부 소식으로 이동
    {
      title: "소식 및 공지",
      leader: "배태욱 청년",
      lines: [
        { type: "link", text: "이번 주 청년부 소식 보기", href: "#news" },
      ],
    },

    {
      title: "목장모임",
      leader: "목장별",
      lines: [],
    },
  ],

  // ✅ 소식 내용
  newsIntro: "이번 주 청년부 소식입니다.",
  newsItems: [
    {
      title: "text",
      body:
        "text\n" +
        "text"
    },
  ],

  // ✅ 찬양 악보 이미지 (assets 폴더)
  praiseFiles: [
    "assets/001.png",
    "assets/002.jpg",
    "assets/003.png",
    "assets/004.jpg",
    "assets/005.png",
  ],
};

// -------------------------------
// DOM
// -------------------------------
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const views = Array.from(document.querySelectorAll(".view"));

const sheet = document.getElementById("sheet");
const openMenuBtn = document.getElementById("openMenu");
const closeMenuBackdrop = document.getElementById("closeMenu");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const topbar = document.querySelector(".js-topbar");

// content targets
const weekBadge = document.getElementById("weekBadge");
const weekSubtitle = document.getElementById("weekSubtitle");

const orderList = document.getElementById("orderList");

const newsIntro = document.getElementById("newsIntro");
const newsList = document.getElementById("newsList");

const praiseFeed = document.getElementById("praiseFeed");

// viewer
const viewer = document.getElementById("viewer");
const viewerRail = document.getElementById("viewerRail");
const viewerCounter = document.getElementById("viewerCounter");
const viewerCloseBg = document.getElementById("viewerCloseBg");
const viewerCloseBtn = document.getElementById("viewerCloseBtn");

// -------------------------------
// Scroll Motion (Home banners)
// -------------------------------
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initScrollMotion() {
  document.querySelectorAll(".scroll-item").forEach((el) => {
    el.classList.remove("is-visible");
    scrollObserver.observe(el);
  });
}

// -------------------------------
// Topbar effect
// -------------------------------
window.addEventListener("scroll", () => {
  if (!topbar) return;
  if (window.scrollY > 18) topbar.classList.add("is-scrolled");
  else topbar.classList.remove("is-scrolled");
});

// -------------------------------
// Sheet menu open/close
// -------------------------------
function openSheet() {
  sheet?.classList.add("is-open");
  sheet?.setAttribute("aria-hidden", "false");
}
function closeSheet() {
  sheet?.classList.remove("is-open");
  sheet?.setAttribute("aria-hidden", "true");
}

openMenuBtn?.addEventListener("click", openSheet);
closeMenuBackdrop?.addEventListener("click", closeSheet);
closeMenuBtn?.addEventListener("click", closeSheet);

// -------------------------------
// Router
// -------------------------------
function hashToViewName(hash) {
  const clean = (hash || "").replace("#", "").trim();
  return clean || "home";
}

function showView(name) {
  views.forEach((v) => {
    const match = v.getAttribute("data-view") === name;
    v.classList.toggle("is-active", match);
  });

  if (!prefersReduced) window.scrollTo({ top: 0, behavior: "smooth" });
  else window.scrollTo(0, 0);

  if (name === "home") setTimeout(initScrollMotion, 60);
}

function route() {
  const name = hashToViewName(location.hash);
  const exists = views.some((v) => v.getAttribute("data-view") === name);

  if (!exists) {
    location.hash = "#home";
    return;
  }

  showView(name);
  closeSheet();
}

document.querySelectorAll("[data-route]").forEach((a) => {
  a.addEventListener("click", () => {
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    location.hash = href;
  });
});

document.querySelectorAll("[data-back]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else location.hash = "#home";
  });
});

window.addEventListener("hashchange", route);

// -------------------------------
// Render weekly content
// -------------------------------
function renderWeek() {
  // home header
  if (weekBadge) weekBadge.textContent = WEEK_DATA.weekBadge || "이번 주";
  if (weekSubtitle) weekSubtitle.innerHTML = (WEEK_DATA.weekSubtitle || "")
    .replaceAll("\n", "<br />");

  // ORDER
  if (orderList) {
    orderList.innerHTML = "";
    (WEEK_DATA.orderItems || []).forEach((item) => {
      const el = document.createElement("div");
      el.className = "orderItem";

      const head = `
        <div class="orderHead">
          <h3 class="orderTitle">${escapeHTML(item.title || "")}</h3>
          <div class="orderLeader">${escapeHTML(item.leader || "")}</div>
        </div>
      `;

      const bodyLines = (item.lines || []).map((line) => {
        if (typeof line === "object" && line.type === "link") {
          return `
            <p>
              <a class="orderLink" href="${escapeAttr(line.href || "#")}" data-route>
                ${escapeHTML(line.text || "")} <span aria-hidden="true">→</span>
              </a>
            </p>
          `;
        }
        return `<p>${escapeHTML(line || "")}</p>`;
      }).join("");

      const verseBlock = (item.verse && item.verse.length)
        ? `
          <div class="orderVerse">
            ${item.verse.map(v => `<p>${escapeHTML(v)}</p>`).join("")}
          </div>
        `
        : "";

      // ✅ 아코디언(사도신경 등)
      const accBlock = (item.accordion && item.accordion.content)
        ? `
          <details class="acc">
            <summary>${escapeHTML(item.accordion.summary || "내용 보기")}</summary>
            <div class="acc__body">
              <p>${formatMultiline(item.accordion.content)}</p>
            </div>
          </details>
        `
        : "";

      el.innerHTML = `
        ${head}
        <div class="orderBody">
          ${bodyLines}
          ${verseBlock}
          ${accBlock}
        </div>
      `;

      orderList.appendChild(el);
    });
  }

  // NEWS
  if (newsIntro) newsIntro.textContent = WEEK_DATA.newsIntro || "";
  if (newsList) {
    newsList.innerHTML = "";
    (WEEK_DATA.newsItems || []).forEach((n) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <p class="bulletTitle">${escapeHTML(n.title || "")}</p>
        <p class="bulletBody">${formatMultiline(n.body || "")}</p>
      `;
      newsList.appendChild(li);
    });
  }

  // PRAISE
  if (praiseFeed) {
    praiseFeed.innerHTML = "";
    const files = WEEK_DATA.praiseFiles || [];

    files.forEach((src, idx) => {
      const card = document.createElement("div");
      card.className = "scoreCard";
      card.innerHTML = `
        <img class="scoreCard__img" src="${encodeURI(src)}" alt="악보 ${idx + 1}" loading="lazy" />
        <div class="scoreCard__cap">악보 ${idx + 1}</div>
      `;

      const img = card.querySelector("img");
      img?.addEventListener("click", () => openViewer(idx));

      praiseFeed.appendChild(card);
    });
  }

  // ensure data-route works inside rendered links
  document.querySelectorAll("[data-route]").forEach((a) => {
    a.addEventListener("click", () => {
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      location.hash = href;
    });
  });
}

// escape helpers
function escapeHTML(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function escapeAttr(str){
  return String(str).replaceAll('"', "&quot;");
}
function formatMultiline(str){
  return escapeHTML(str).replaceAll("\n", "<br />");
}

// -------------------------------
// Fullscreen viewer (좌우 넘기기)
// -------------------------------
let viewerFiles = [];

function openViewer(startIndex = 0) {
  viewerFiles = WEEK_DATA.praiseFiles || [];
  if (!viewer || !viewerRail || !viewerCounter) return;
  if (viewerFiles.length === 0) return;

  viewerRail.innerHTML = "";
  viewerFiles.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "viewer__slide";
    slide.innerHTML = `<img src="${encodeURI(src)}" alt="악보 크게보기 ${i + 1}" />`;
    viewerRail.appendChild(slide);
  });

  viewer.classList.add("is-open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");

  updateViewerCounter(startIndex);

  setTimeout(() => {
    const target = viewerRail.children[startIndex];
    target?.scrollIntoView({ behavior: "instant", inline: "start", block: "nearest" });
  }, 50);
}

function closeViewer() {
  if (!viewer) return;
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
}

function updateViewerCounter(index) {
  if (!viewerCounter) return;
  viewerCounter.textContent = `${index + 1} / ${viewerFiles.length}`;
}

let rafId = null;
viewerRail?.addEventListener("scroll", () => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    const w = viewerRail.clientWidth || 1;
    const idx = Math.round(viewerRail.scrollLeft / w);
    const safe = Math.max(0, Math.min(viewerFiles.length - 1, idx));
    updateViewerCounter(safe);
  });
});

viewerCloseBg?.addEventListener("click", closeViewer);
viewerCloseBtn?.addEventListener("click", closeViewer);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeViewer();
});

// -------------------------------
// init
// -------------------------------
window.addEventListener("load", () => {
  if (!location.hash) location.hash = "#home";
  renderWeek();
  route();
  initScrollMotion();
});
