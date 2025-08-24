let chartRef = null;
let currentLang = localStorage.getItem("wd_lang") || "en";
let currentTheme = localStorage.getItem("wd_theme") || "light";

const $ = (s) => document.querySelector(s);
const yearEl = $("#year");
const langSelect = $("#langSelect");
const cropSelect = $("#cropSelect");
const waterRange = $("#waterRange");
const growthDays = $("#growthDays");
const themeToggle = $("#themeToggle");

function populateCrops(lang) {
  cropSelect.innerHTML = "";
  CROPS.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name[lang] || c.name.en;
    cropSelect.appendChild(opt);
  });
}

function getCrop(id) { return CROPS.find(c => c.id === id) || CROPS[0]; }

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function renderChart(crop) {
  const ctx = document.getElementById("usageChart");
  if (chartRef) chartRef.destroy();

  const gridColor = cssVar("--grid") || "#e6ecf7";
  const tickColor = cssVar("--ticks") || "#5b667d";

  chartRef = new Chart(ctx, {
    type: "line",
    data: {
      labels: crop.months,
      datasets: [
        {
          label: I18N[currentLang].legendActual,
          data: crop.actual,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          borderColor: crop.colors.actual,
          backgroundColor: crop.colors.actual + "33",
        },
        {
          label: I18N[currentLang].legendBench,
          data: crop.benchmark,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          borderColor: crop.colors.bench,
          backgroundColor: crop.colors.bench + "33",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: tickColor } },
        x: { grid: { color: gridColor }, ticks: { color: tickColor } },
      },
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
    },
  });
}

function updateUI() {
  const crop = getCrop(cropSelect.value);
  waterRange.textContent = crop.waterNeededRange;
  growthDays.textContent = crop.growthDays;
  renderChart(crop);
}

// THEME HANDLING
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  localStorage.setItem("wd_theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  // re-render chart to refresh grid/tick colors
  updateUI();
}

window.addEventListener("DOMContentLoaded", () => {
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Language init
  langSelect.value = currentLang;
  applyI18n(currentLang);

  // Crops init
  populateCrops(currentLang);
  cropSelect.value = localStorage.getItem("wd_crop") || CROPS[0].id;

  // Theme init
  applyTheme(currentTheme);

  updateUI();

  // Events
  langSelect.addEventListener("change", () => {
    currentLang = langSelect.value;
    localStorage.setItem("wd_lang", currentLang);
    applyI18n(currentLang);
    updateUI();
    // keep selected crop text updated
    const keep = cropSelect.value; populateCrops(currentLang); cropSelect.value = keep;
  });

  cropSelect.addEventListener("change", () => {
    localStorage.setItem("wd_crop", cropSelect.value);
    updateUI();
  });

  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
  });
});
