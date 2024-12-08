const mainSection = document.getElementById("main");
const gameSection = document.getElementById("game");
document.getElementById("singleplayer").addEventListener("click", () => {
  mainSection.style.display = "none";
  gameSection.style.display = "block";
});
document.getElementById("twoplayer").addEventListener("click", () => {
  mainSection.style.display = "none";
  gameSection.style.display = "block";
});
