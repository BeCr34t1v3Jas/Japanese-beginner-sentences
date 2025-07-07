// Replace this with your actual API URL
const API_URL = "https://your-api-endpoint.com/api/japanese-sentence";

document
  .querySelector("#sentence-generator-form")
  .addEventListener("submit", generateSentence);

function generateSentence(event) {
  event.preventDefault();

  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch sentence.");
      }
      return response.json();
    })
    .then((data) => {
      const jp = data.jp || "文が見つかりません";
      const romaji = data.romaji || "Romaji not available";
      const en = data.en || "English translation not available";

      displayWithTypewriter("#jp", jp);
      displayWithTypewriter("#romaji", romaji);
      displayWithTypewriter("#en", en);
    })
    .catch((error) => {
      console.error("Error fetching sentence:", error);
      document.querySelector("#jp").textContent = "Error loading sentence.";
      document.querySelector("#romaji").textContent = "";
      document.querySelector("#en").textContent = "";
    });
}

function displayWithTypewriter(target, text) {
  const element = document.querySelector(target);
  element.innerHTML = "";

  const typewriter = new Typewriter(element, {
    loop: false,
    delay: 35,
    cursor: "",
  });

  typewriter.typeString(text).start();
}
