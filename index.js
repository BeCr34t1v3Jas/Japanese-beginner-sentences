const API_KEY = "o451tfe63da40fdab9f02fbc358bc697";
const API_URL = "https://api.shecodes.io/ai/v1/generate";

document
  .querySelector("#sentence-generator-form")
  .addEventListener("submit", generateSentence);

function generateSentence(event) {
  event.preventDefault();

  const category = document.querySelector("#category-input").value.trim();
  if (!category) {
    alert("Please enter a topic.");
    return;
  }

  const prompt = `Give me one beginner-level Japanese sentence about "${category}", including Romaji and English translation. Format it as: JP: [Japanese] | Romaji: [Romaji] | EN: [English].`;

  const url = `${API_URL}?prompt=${encodeURIComponent(prompt)}&context=Beginner-friendly, short sentence.&key=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const answer = data.answer;

      // Extract the 3 fields using regex
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
      console.error("API Error:", error);
      displayWithTypewriter("#jp", "Error loading sentence");
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
    delay: 35,
    cursor: "",
  });
}
const loader = document.querySelector("#loader");
loader.classList.remove("hidden"); // Show spinner

// After getting API response or error
loader.classList.add("hidden"); // Hide spinner
