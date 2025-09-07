// Load stats
const shortsToday = parseInt(localStorage.getItem("doomscrollTotalToday") || 0);
const strikesToday = parseInt(localStorage.getItem("doomscrollStrikes") || 0);
const blockedToday = localStorage.getItem("doomscrollBlockedToday") === "true" ? "Yes" : "No";
const averageShorts = parseInt(localStorage.getItem("doomscrollAverageShorts") || 10);

// Update DOM
document.getElementById("shortsToday").textContent = shortsToday;
document.getElementById("strikesToday").textContent = strikesToday;
document.getElementById("blockedToday").textContent = blockedToday;

// Adaptive threshold & remaining
const thresholdDiv = document.createElement("div");
thresholdDiv.className = "stat";
thresholdDiv.innerHTML = `<strong>Adaptive Limit:</strong> ${averageShorts} | Remaining: ${Math.max(0, averageShorts - shortsToday)}`;
document.body.insertBefore(thresholdDiv, document.getElementById("chart"));

// Weekly chart
const history = JSON.parse(localStorage.getItem("doomscrollHistory") || "{}");
const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const weeklyData = labels.map(day => {
  let found = Object.keys(history).find(dateStr => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', { weekday: 'short' }) === day;
  });
  return found ? history[found] : 0;
});

const ctx = document.getElementById('chart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{ label: 'Shorts Watched', data: weeklyData, backgroundColor: 'rgba(255,99,132,0.6)' }]
  },
  options: { responsive: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
});
