

let shortsViewed = 0;
let lastShortId = null;
let THRESHOLD = 10;
let BREAK_TIME = 2 * 60 * 1000;
let isOnBreak = false;

// Load user settings
chrome.storage.local.get(["shortsLimit", "breakTime"], (res) => {
  if (res.shortsLimit) THRESHOLD = res.shortsLimit;
  if (res.breakTime) BREAK_TIME = res.breakTime * 60 * 1000;
  console.log(`⚙️ Settings → Limit: ${THRESHOLD}, Break: ${BREAK_TIME / 60000}min`);
});

// ---------- Helper ----------
function getCurrentShortId() {
  const m = window.location.pathname.match(/\/shorts\/([^\/?&]+)/);
  return m ? m[1] : null;
}

// ---------- Floating Counter ----------
function createFloatingOverlay() {
  if (document.getElementById("doomscrollFloating")) return;
  const o = document.createElement("div");
  o.id = "doomscrollFloating";
  Object.assign(o.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    padding: "8px 12px",
    backgroundColor: "rgba(229,57,53,0.9)",
    color: "white",
    fontSize: "14px",
    borderRadius: "8px",
    zIndex: "9999",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
  });
  document.body.appendChild(o);
  updateFloatingOverlay();
}
function updateFloatingOverlay() {
  chrome.storage.local.get(["doomscrollTotalToday"], (res) => {
    const total = res.doomscrollTotalToday || 0;
    const o = document.getElementById("doomscrollFloating");
    if (o) o.textContent = `🎬 ${shortsViewed}/${THRESHOLD} | Total: ${total}`;
  });
}

// ---------- Overlays ----------
function showBreakOverlay(msg) {
  if (document.getElementById("breakBlock")) return;
  const b = document.createElement("div");
  b.id = "breakBlock";
  Object.assign(b.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: "9998"
  });
  const t = document.createElement("div");
  Object.assign(t.style, {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "24px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center"
  });
  t.textContent = msg;
  b.appendChild(t);
  document.body.appendChild(b);
}

// ---------- Strikes & Blocking ----------
function incrementStrike() {
  chrome.storage.local.get(["doomscrollStrikes"], (res) => {
    const strikes = (res.doomscrollStrikes || 0) + 1;
    chrome.storage.local.set({ doomscrollStrikes: strikes });
    if (strikes >= 2) {
      chrome.storage.local.set({ doomscrollBlockedToday: true });
      alert("Doomscroll Breaker: YouTube blocked for today!");
      window.location.href = "https://www.google.com/";
    }
  });
}

// ---------- Break Logic ----------
function startBreak() {
  isOnBreak = true;
  showBreakOverlay(`⏳ Break Time! No Shorts for ${BREAK_TIME / 60000} minutes.`);
  incrementStrike();

  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ type: "BREAK_ALERT" });
  }

  setTimeout(() => {
    isOnBreak = false;
    shortsViewed = 0;
    document.getElementById("breakBlock")?.remove();
  }, BREAK_TIME);
}

// ---------- Daily Reset ----------
function dailyReset() {
  const today = new Date().toDateString();
  chrome.storage.local.get(["doomscrollLastDay", "doomscrollBlockedToday"], (res) => {
    if (res.doomscrollLastDay !== today) {
      chrome.storage.local.set({
        doomscrollLastDay: today,
        doomscrollTotalToday: 0,
        doomscrollStrikes: 0,
        doomscrollBlockedToday: false
      });
    }
    if (res.doomscrollBlockedToday) {
      window.location.href = "https://www.google.com/";
    }
  });
}

// ---------- History ----------
function updateDailyHistory() {
  const today = new Date().toDateString();
  chrome.storage.local.get(["doomscrollHistory", "doomscrollTotalToday"], (res) => {
    const hist = res.doomscrollHistory || {};
    hist[today] = res.doomscrollTotalToday || 0;
    const sorted = Object.keys(hist).sort((a, b) => new Date(a) - new Date(b));
    while (sorted.length > 7) delete hist[sorted.shift()];
    chrome.storage.local.set({ doomscrollHistory: hist });
  });
}

// ---------- Keyword Classifier ----------
const eduWords = ["tutorial","how to","learn","study","science","math","coding","explained","course","educational"];
const entWords = ["funny","prank","dance","music","meme","comedy","vlog","challenge","gaming","entertainment"];
function classifyShort(title) {
  const t = title.toLowerCase();
  const e1 = eduWords.filter((w) => t.includes(w)).length;
  const e2 = entWords.filter((w) => t.includes(w)).length;
  if (e1 > e2) return "Educational";
  if (e2 > e1) return "Entertainment";
  return "Neutral";
}
function getShortTitle() {
  const el = document.querySelector("h1.title.style-scope.ytd-shorts-player, h1.ytd-reel-player-header-renderer");
  return el ? el.textContent.trim() : "";
}

// ---------- Tracking ----------
function trackShorts() {
  if (isOnBreak) return;
  const id = getCurrentShortId();
  if (id && id !== lastShortId) {
    lastShortId = id;
    shortsViewed++;

    chrome.storage.local.get(["doomscrollTotalToday"], (res) => {
      const total = (res.doomscrollTotalToday || 0) + 1;
      chrome.storage.local.set({ doomscrollTotalToday: total });
    });

    const title = getShortTitle();
    const cat = classifyShort(title);

    chrome.storage.local.get(["doomscrollContentStats"], (res) => {
      let s = res.doomscrollContentStats || { Educational: 0, Entertainment: 0, Neutral: 0 };
      s[cat] = (s[cat] || 0) + 1;
      chrome.storage.local.set({ doomscrollContentStats: s });
    });

    console.log(`🧠 ${cat}: ${title}`);
    updateFloatingOverlay();
    if (shortsViewed >= THRESHOLD) startBreak();
  }
}

// ---------- Init ----------
createFloatingOverlay();
setInterval(() => {
  dailyReset();
  trackShorts();
  updateDailyHistory();
}, 1000);
console.log("Doomscroll Breaker v3.1 active with shared chrome.storage");
