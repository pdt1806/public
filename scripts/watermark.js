const watermarkList = [
  "benny's public library",
  "thư viện công cộng của benny",
  "la biblioteca pública de benny",
  "ベニーの公共図書館",
];

const watermarkDiv = document.createElement("div");
watermarkDiv.id = "watermark";
document.body.append(watermarkDiv);

const currentWatermarkIndex = parseInt(localStorage.getItem("watermarkIndex"));

let watermarkIndex = currentWatermarkIndex || 0;
watermarkDiv.textContent = watermarkList[watermarkIndex];

const updateWatermark = () => {
  watermarkIndex = (watermarkIndex + 1) % watermarkList.length;
  watermarkDiv.textContent = watermarkList[watermarkIndex];
  localStorage.setItem("watermarkIndex", watermarkIndex);
};

watermarkDiv.onclick = updateWatermark;
