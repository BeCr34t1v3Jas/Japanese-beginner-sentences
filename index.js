function generateSentence(event) {
  event.preventDefault();

  const sentences = [
    {
      jp: "初めてのアルバイトはいい経験でした。",
      romaji: "Hajimete no arubaito wa ii keiken deshita.",
      en: "My first part-time job was a good experience.",
    },
    {
      jp: "これはペンです。",
      romaji: "Kore wa pen desu.",
      en: "This is a pen.",
    },
    {
      jp: "猫が好きです。",
      romaji: "Neko ga suki desu.",
      en: "I like cats.",
    },
    {
      jp: "東京に行きたいです。",
      romaji: "Tōkyō ni ikitai desu.",
      en: "I want to go to Tokyo.",
    },
    {
      jp: "毎日日本語を勉強しています。",
      romaji: "Mainichi nihongo o benkyō shiteimasu.",
      en: "I study Japanese every day.",
    },
  ];

  const random = sentences[Math.floor(Math.random() * sentences.length)];

  document.getElementById("jp").innerHTML = "";
  document.getElementById("romaji").innerHTML = "";
  document.getElementById("en").innerHTML = "";

  new Typewriter("#jp", {
    strings: random.jp,
    autoStart: true,
    delay: 45,
    cursor: "",
  });

  new Typewriter("#romaji", {
    strings: random.romaji,
    autoStart: true,
    delay: 45,
    cursor: "",
  });

  new Typewriter("#en", {
    strings: random.en,
    autoStart: true,
    delay: 45,
    cursor: "",
  });
}

document
  .getElementById("sentence-generator-form")
  .addEventListener("submit", generateSentence);
