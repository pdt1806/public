const watermarkList = [
  "benny's public library",
  "thư viện công cộng của benny",
  "la biblioteca pública de benny",
  "ベニーの公共図書館",
];

const currentWatermarkIndex = localStorage.getItem("watermarkIndex");

const watermarkDiv = document.getElementById("watermark");
watermarkDiv.style.transition = "transform 0.1s";

let watermarkIndex = currentWatermarkIndex || 0;
watermarkDiv.textContent = watermarkList[watermarkIndex];

const updateWatermark = () => {
  watermarkDiv.style.transform = "scale(1.05)";
  watermarkIndex = (watermarkIndex + 1) % watermarkList.length;
  setTimeout(() => {
    watermarkDiv.style.transform = "scale(1)";
  }, 100);
  watermarkDiv.textContent = watermarkList[watermarkIndex];
  localStorage.setItem("watermarkIndex", watermarkIndex);
};

watermarkDiv.onclick = updateWatermark;
