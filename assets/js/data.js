// Per-crop data and colors (colors stay same for both themes)
const CROPS = [
  {
    id: "rice",
    name: { en: "Rice", hi: "चावल" },
    waterNeededRange: "1,500-2,000",
    growthDays: "120-150",
    months: ["Jan", "Feb", "Mar", "Apr"],
    actual: [640, 685, 720, 760],
    benchmark: [550, 580, 605, 635],
    colors: { actual: "#1fb6aa", bench: "#ff8c00" } // teal & orange
  },
  {
    id: "wheat",
    name: { en: "Wheat", hi: "गेहूं" },
    waterNeededRange: "450-650",
    growthDays: "110-130",
    months: ["Jan", "Feb", "Mar", "Apr"],
    actual: [480, 510, 540, 575],
    benchmark: [430, 450, 470, 500],
    colors: { actual: "#8a67f6", bench: "#7cd992" } // purple & lime
  },
  {
    id: "maize",
    name: { en: "Corn", hi: "मक्का" },
    waterNeededRange: "500-800",
    growthDays: "90-120",
    months: ["Jan", "Feb", "Mar", "Apr"],
    actual: [620, 650, 710, 750],
    benchmark: [540, 560, 600, 635],
    colors: { actual: "#4f74ff", bench: "#3cbc7a" } // blue & green
  },
];
