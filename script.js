const zodiacData = [
  {
    sign: "♈ Aries",
    from: "03-21",
    to: "04-19",
    traits: "🔥 Energetic, Confident",
    compatible: "Leo, Sagittarius",
  },
  {
    sign: "♉ Taurus",
    from: "04-20",
    to: "05-20",
    traits: "🌱 Reliable, Patient",
    compatible: "Virgo, Capricorn",
  },
  {
    sign: "♊ Gemini",
    from: "05-21",
    to: "06-20",
    traits: "💨 Curious, Witty",
    compatible: "Libra, Aquarius",
  },
  {
    sign: "♋ Cancer",
    from: "06-21",
    to: "07-22",
    traits: "🌊 Emotional, Loyal",
    compatible: "Scorpio, Pisces",
  },
  {
    sign: "♌ Leo",
    from: "07-23",
    to: "08-22",
    traits: "🌞 Bold, Charismatic",
    compatible: "Aries, Sagittarius",
  },
  {
    sign: "♍ Virgo",
    from: "08-23",
    to: "09-22",
    traits: "🌾 Analytical, Practical",
    compatible: "Taurus, Capricorn",
  },
  {
    sign: "♎ Libra",
    from: "09-23",
    to: "10-22",
    traits: "⚖️ Charming, Diplomatic",
    compatible: "Gemini, Aquarius",
  },
  {
    sign: "♏ Scorpio",
    from: "10-23",
    to: "11-21",
    traits: "🔥 Passionate, Determined",
    compatible: "Cancer, Pisces",
  },
  {
    sign: "♐ Sagittarius",
    from: "11-22",
    to: "12-21",
    traits: "🌍 Adventurous, Honest",
    compatible: "Aries, Leo",
  },
  {
    sign: "♑ Capricorn",
    from: "12-22",
    to: "01-19",
    traits: "🏔 Ambitious, Disciplined",
    compatible: "Taurus, Virgo",
  },
  {
    sign: "♒ Aquarius",
    from: "01-20",
    to: "02-18",
    traits: "🌌 Innovative, Independent",
    compatible: "Gemini, Libra",
  },
  {
    sign: "♓ Pisces",
    from: "02-19",
    to: "03-20",
    traits: "🌊 Dreamy, Compassionate",
    compatible: "Cancer, Scorpio",
  },
];

function getZodiac(month, day) {
  const input = `${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
  for (const z of zodiacData) {
    if (
      (input >= z.from && input <= z.to) ||
      (z.from > z.to && (input >= z.from || input <= z.to))
    )
      return z;
  }
  return null;
}

document.getElementById("analyzeBtn").addEventListener("click", () => {
  const name = document.getElementById("fullName").value.trim();
  const dob = document.getElementById("birthDate").value;

  if (!name || !dob) return alert("Please enter your name and date of birth.");

  const date = new Date(dob);
  const z = getZodiac(date.getMonth() + 1, date.getDate());

  if (!z) return alert("Invalid date!");

  document.getElementById(
    "zodiacSign"
  ).textContent = `♈ Zodiac Sign: ${z.sign}`;
  document.getElementById(
    "traits"
  ).textContent = `✨ Personality Traits: ${z.traits}`;
  document.getElementById(
    "compatibility"
  ).textContent = `💞 Most Compatible With: ${z.compatible}`;

  document.getElementById("result").classList.remove("hidden");

  document.getElementById("generateCardBtn").onclick = () =>
    generateCard(name, z);
  document.getElementById("downloadBtn").onclick = () => downloadCard();
});

function generateCard(name, zodiac) {
  const canvas = document.getElementById("zodiacCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 300;
  canvas.classList.remove("hidden");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#4203a9";
  ctx.font = "24px Poppins";
  ctx.fillText("🔮 ZodiMatch Personality Card", 90, 40);

  ctx.fillStyle = "#000";
  ctx.font = "18px Poppins";
  ctx.fillText(`👤 Name: ${name}`, 50, 90);
  ctx.fillText(`♈ Zodiac Sign: ${zodiac.sign}`, 50, 130);
  ctx.fillText(`✨ Traits: ${zodiac.traits}`, 50, 170);
  ctx.fillText(`💞 Compatible With: ${zodiac.compatible}`, 50, 210);
}

function downloadCard() {
  const canvas = document.getElementById("zodiacCanvas");
  const link = document.createElement("a");
  link.download = "Zodiac_Personality_Card.png";
  link.href = canvas.toDataURL();
  link.click();
}
