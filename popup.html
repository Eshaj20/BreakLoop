// ======================================
// Doomscroll Breaker - popup.js (v3.3)
// ======================================

// ---------- Dashboard Loader ----------
function loadDashboard() {
  chrome.storage.local.get(
    [
      "doomscrollTotalToday",
      "doomscrollStrikes",
      "doomscrollBlockedToday",
      "doomscrollHistory",
      "doomscrollContentStats",
      "shortsLimit"
    ],
    (res) => {
      const shortsToday = res.doomscrollTotalToday || 0;
      const strikesToday = res.doomscrollStrikes || 0;
      const blockedToday = res.doomscrollBlockedToday ? "Yes" : "No";
      const limit = res.shortsLimit || 10;

      // Update text
      document.getElementById("shortsToday").textContent = shortsToday;
      document.getElementById("strikesToday").textContent = strikesToday;
      document.getElementById("blockedToday").textContent = blockedToday;

      // Draw charts safely
      drawProgress(shortsToday, limit);
      drawHistory(res.doomscrollHistory || {});
      drawTypeChart(res.doomscrollContentStats || { Educational: 0, Entertainment: 0, Neutral: 0 });
    }
  );
}

// ---------- Progress Donut Chart ----------
function drawProgress(current, limit) {
  const canvas = document.getElementById("progressChart");
  if (!canvas) return;
  if (typeof Chart === "undefined") {
    console.warn("Chart.js not loaded for progressChart");
    return;
  }

  const ctx = canvas.getContext("2d");
  const pct = Math.min(current / limit, 1);

  // Clear old chart if needed
  if (canvas.chartInstance) {
    canvas.chartInstance.destroy();
  }

  canvas.chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [pct * 100, 100 - pct * 100],
          backgroundColor: ["#e53935", "#eeeeee"],
          borderWidth: 0
        }
      ]
    },
    options: {
      cutout: "70%",
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}

// ---------- 7-Day History ----------
function drawHistory(hist) {
  const canvas = document.getElementById("chart");
  if (!canvas || typeof Chart === "undefined") return;
  const ctx = canvas.getContext("2d");

  const labels = Object.keys(hist).slice(-7);
  const data = Object.values(hist).slice(-7);

  if (canvas.chartInstance) canvas.chartInstance.destroy();

  canvas.chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Shorts Watched", data, backgroundColor: "rgba(229,57,53,0.6)" }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// ---------- Content Type Pie Chart ----------
function drawTypeChart(stats) {
  const canvas = document.getElementById("typeChart");
  if (!canvas || typeof Chart === "undefined") return;
  const ctx = canvas.getContext("2d");

  if (canvas.chartInstance) canvas.chartInstance.destroy();

  canvas.chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Educational", "Entertainment", "Neutral"],
      datasets: [
        {
          data: [
            stats.Educational || 0,
            stats.Entertainment || 0,
            stats.Neutral || 0
          ],
          backgroundColor: ["#43a047", "#e53935", "#999"]
        }
      ]
    },
    options: { plugins: { legend: { position: "bottom" } } }
  });
}

// ---------- Tabs ----------
document.querySelectorAll(".tab").forEach((tab, i) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".content").forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".content")[i].classList.add("active");
  });
});

// ---------- Save Settings ----------
document.getElementById("saveBtn")?.addEventListener("click", () => {
  const lim = parseInt(document.getElementById("limitInput").value) || 10;
  const br = parseInt(document.getElementById("breakInput").value) || 2;
  chrome.storage.local.set({ shortsLimit: lim, breakTime: br }, () => {
    const msg = document.getElementById("saveMsg");
    msg.textContent = "✅ Settings saved!";
    setTimeout(() => (msg.textContent = ""), 2000);
  });
});

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", loadDashboard);
setInterval(loadDashboard, 4000);

console.log("✅ Popup Dashboard v3.3 loaded successfully");
