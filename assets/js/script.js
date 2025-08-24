const ctx = document.getElementById('waterChart').getContext('2d');
let currentCrop = 'wheat';
let chart;

function renderChart(crop) {
  if(chart) chart.destroy();
  const data = cropData[crop];
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Usage',
          data: data.usage,
          borderColor: data.color,
          fill: false
        },
        {
          label: 'Sustainable',
          data: data.sustainable,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderDash: [5,5],
          fill: false
        }
      ]
    }
  });
}

function updateLanguage(lang) {
  document.getElementById('title').innerText = translations[lang].title;
  document.getElementById('recentUsageTitle').innerText = translations[lang].recentUsageTitle;
  document.getElementById('sustainableLevelTitle').innerText = translations[lang].sustainableLevelTitle;
  localStorage.setItem('language', lang);
}

document.getElementById('languageSwitcher').addEventListener('change', (e) => {
  updateLanguage(e.target.value);
});

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.getElementById('themeToggle').innerText = theme === 'dark' ? '☀️' : '🌙';
});

window.onload = () => {
  const savedLang = localStorage.getItem('language') || 'en';
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.getElementById('languageSwitcher').value = savedLang;
  updateLanguage(savedLang);
  if(savedTheme === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('themeToggle').innerText = '☀️';
  }
  renderChart(currentCrop);
};
