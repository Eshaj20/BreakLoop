let shortsViewed = 0;
let lastShortId = null;
const THRESHOLD = 10;              // Max Shorts per session
const BREAK_TIME = 2 * 60 * 1000;  // 2 minutes break
let isOnBreak = false;

// ================= Get current Short ID =================
function getCurrentShortId() {
  const match = window.location.pathname.match(/\/shorts\/([^\/?&]+)/);
  return match ? match[1] : null;
}

// ================= Floating Overlay =================
function createFloatingOverlay() {
  if (document.getElementById("doomscrollFloating")) return;
  const overlay = document.createElement("div");
  overlay.id = "doomscrollFloating";
  overlay.style.position = "fixed";
  overlay.style.top = "10px";
  overlay.style.right = "10px";
  overlay.style.padding = "8px 12px";
  overlay.style.backgroundColor = "rgba(255,0,0,0.85)";
  overlay.style.color = "white";
  overlay.style.fontSize = "14px";
  overlay.style.borderRadius = "8px";
  overlay.style.zIndex = "9999";
  overlay.style.fontFamily = "Arial, sans-serif";
  overlay.style.boxShadow = "0 2px 8px rgba(0,0,0,0.5)";
  document.body.appendChild(overlay);
  updateFloatingOverlay();
}

function updateFloatingOverlay() {
  const totalToday = parseInt(localStorage.getItem("doomscrollTotalToday") || 0);
  const overlay = document.getElementById("doomscrollFloating");
  if (overlay) overlay.textContent = `🎬 ${shortsViewed}/${THRESHOLD} | Total Today: ${totalToday}`;
}

// ================= Break Overlay =================
function showBreakOverlay(message) {
  if (document.getElementById("breakBlock")) return;
  const block = document.createElement("div");
  block.id = "breakBlock";
  block.style.position = "fixed";
  block.style.top = "0";
  block.style.left = "0";
  block.style.width = "100%";
  block.style.height = "100%";
  block.style.backgroundColor = "rgba(0,0,0,0.7)";
  block.style.zIndex = "9998";

  const text = document.createElement("div");
  text.style.position = "absolute";
  text.style.top = "50%";
  text.style.left = "50%";
  text.style.transform = "translate(-50%, -50%)";
  text.style.color = "white";
  text.style.fontSize = "24px";
  text.style.fontFamily = "Arial, sans-serif";
  text.style.textAlign = "center";
  text.textContent = message;

  block.appendChild(text);
  document.body.appendChild(block);
}

// ================= Track Strikes =================
function incrementStrike() {
  let strikes = parseInt(localStorage.getItem("doomscrollStrikes") || 0);
  strikes++;
  localStorage.setItem("doomscrollStrikes", strikes);

  if (strikes >= 2) {
    localStorage.setItem("doomscrollBlockedToday", "true");
    alert("🚨 Doomscroll Breaker: YouTube is blocked for the rest of the day!");
    window.location.href = "https://www.google.com/"; // redirect away completely
  }
}

// ================= Start Break =================
function startBreak() {
  isOnBreak = true;
  showBreakOverlay(`⏳ Break Time! No Shorts for 2 minutes.`);
  incrementStrike();

  setTimeout(() => {
    isOnBreak = false;
    shortsViewed = 0;
    if (document.getElementById("breakBlock")) document.getElementById("breakBlock").remove();
  }, BREAK_TIME);
}

// ================= Daily Reset =================
function dailyReset() {
  const today = new Date().toDateString();
  const lastDay = localStorage.getItem("doomscrollLastDay");
  if (lastDay !== today) {
    shortsViewed = 0;
    localStorage.setItem("doomscrollLastDay", today);
    localStorage.setItem("doomscrollTotalToday", 0);
    localStorage.setItem("doomscrollStrikes", 0);
    localStorage.setItem("doomscrollBlockedToday", "false");
  }

  if (localStorage.getItem("doomscrollBlockedToday") === "true") {
    window.location.href = "https://www.google.com/";
  }
}

// ================= Update Daily History =================
function updateDailyHistory() {
  const today = new Date().toDateString();
  let history = JSON.parse(localStorage.getItem("doomscrollHistory") || "{}");
  history[today] = parseInt(localStorage.getItem("doomscrollTotalToday") || 0);

  const sortedDates = Object.keys(history).sort((a,b) => new Date(a) - new Date(b));
  if (sortedDates.length > 7) {
    const excess = sortedDates.length - 7;
    for (let i = 0; i < excess; i++) delete history[sortedDates[i]];
  }

  localStorage.setItem("doomscrollHistory", JSON.stringify(history));
}

// ================= Track Shorts =================
function trackShorts() {
  if (isOnBreak) return;
  const currentId = getCurrentShortId();
  if (currentId && currentId !== lastShortId) {
    lastShortId = currentId;
    shortsViewed++;

    let total = parseInt(localStorage.getItem("doomscrollTotalToday") || 0);
    total++;
    localStorage.setItem("doomscrollTotalToday", total);

    updateFloatingOverlay();
    if (shortsViewed >= THRESHOLD) startBreak();
  }
}

// ================= Initialize =================
createFloatingOverlay();
setInterval(() => {
  dailyReset();
  trackShorts();
  updateDailyHistory();
}, 500);

console.log("✅ Doomscroll Breaker injected with 2-session max (blocks YouTube on 2nd attempt)!");
