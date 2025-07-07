const API_KEY = "o451tfe63da40fdab9f02fbc358bc697";
const API_BASE = "https://api.shecodes.io/ai/v1/generate";

document
  .querySelector("#sentence-generator-form")
  .addEventListener("submit", generateSentence);

function generateSentence(event) {
  event.preventDefault();

  const prompt =
    "Give me a Japanese beginner sentence with its Romaji and English translation. Format: JP: [sentence] | Romaji: [romaji] | EN: [translation]";
  const url = `${API_BASE}?prompt=${encodeURIComponent(prompt)}&key=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const answer = data.answer;

      // Extract values using regex
      const jpMatch = answer.match(/JP:\s?(.*?)(\||$)/i);
      const romajiMatch = answer.match(/Romaji:\s?(.*?)(\||$)/i);
      const enMatch = answer.match(/EN:\s?(.*?)(\||$)/i);

      const jp = jpMatch ? jpMatch[1].trim() : "Not found";
      const romaji = romajiMatch ? romajiMatch[1].trim() : "Not found";
      const en = enMatch ? enMatch[1].trim() : "Not found";

      displayWithTypewriter("#jp", jp);
      displayWithTypewriter("#romaji", romaji);
      displayWithTypewriter("#en", en);
    })
    .catch((error) => {
      console.error("API call failed:", error);
      displayWithTypewriter("#jp", "Error fetching sentence");
      displayWithTypewriter("#romaji", "");
      displayWithTypewriter("#en", "");
    });
}

function displayWithTypewriter(target, text) {
  const el = document.querySelector(target);
  el.innerHTML = "";

  new Typewriter(el, {
    strings: text,
    autoStart: true,
    delay: 40,
    cursor: "",
  });
}

