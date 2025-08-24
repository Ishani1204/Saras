const I18N = {
  en: {
    title: "Agricultural Water Management Dashboard",
    waterNeeded: "Water Needed (mm)",
    growthDuration: "Growth Duration (days)",
    analysisTitle: "Water Usage Analysis",
    legendActual: "Actual Usage",
    legendBench: "Sustainable Benchmark",
    footer: "Water Conservation Initiative",
  },
  hi: {
    title: "कृषि जल प्रबंधन डैशबोर्ड",
    waterNeeded: "आवश्यक पानी (मिमी)",
    growthDuration: "विकास अवधि (दिन)",
    analysisTitle: "जल उपयोग विश्लेषण",
    legendActual: "वास्तविक उपयोग",
    legendBench: "सतत बेंचमार्क",
    footer: "जल संरक्षण पहल",
  },
};

function applyI18n(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
  });
}
