const wetonMeanings = {
  7: "Pendita Kang Lelaku: Wanderer, thinker, few words but strong will.",
  8: "Lakuning Geni: Like fire. Ambitious, intense, sometimes explosive.",
  9: "Lakuning Angin: Like wind. Flexible, smart, easily influenced.",
  10: "Pendita Mbangun Teki: Clever, full of advice, dislikes being advised.",
  11: "Lakuning Setan: Bold, defiant, but indecisive.",
  12: "Lakuning Kembang: Peaceful, polite, artistic, easily tricked.",
  13: "Lakuning Lintang: Star-like charm, introverted, generous.",
  14: "Lakuning Mbulan: Enlightening, friendly, social guide.",
  15: "Lakuning Geni & Bumi: Strong, assertive, but emotionally fiery.",
  16: "Lakuning Banyu: Calm and wise, but may burst under pressure.",
  17: "Lakuning Gunung: Quiet, smart, protective, but stubborn.",
  18: "Lakuning Paripurna: Dominant, powerful, respected and generous."
};

const dayTraits = {
  Sunday: "Mega: Smart, reserved, wise, likes helping.",
  Monday: "Kembang: Artistic, kind, easily hurt.",
  Tuesday: "Api: Loyal, energetic, fast to anger.",
  Wednesday: "Daun: Quiet, approachable, respected.",
  Thursday: "Angin & Petir: Ambitious, quick learner, emotional.",
  Friday: "Air: Calm, wise, social spirit.",
  Saturday: "Bumi: Protective, patient, strong-willed."
};

const pasaranTraits = {
  Legi: "Manis: Optimistic and cheerful, can be meddlesome.",
  Pahing: "Pahit: Ambitious and clever, but possessive.",
  Pon: "Petak: Wise leader, but easily offended.",
  Wage: "Cemeng: Loyal and firm, but rigid.",
  Kliwon: "Asih: Sensitive, spiritual, diplomatic."
};

function getWeton(dateStr) {
  const pasaranList = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
  const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const inputDate = new Date(dateStr);
  const referenceDate = new Date("1900-01-01");
  const diffInDays = Math.floor((inputDate - referenceDate) / (1000 * 60 * 60 * 24));

  const dayIndex = (1 + diffInDays % 7 + 7) % 7;
  const weekday = dayList[dayIndex];

  const pasaranIndex = (1 + diffInDays % 5 + 5) % 5;
  const pasaran = pasaranList[pasaranIndex];

  const neptuDay = {
    Sunday: 5,
    Monday: 4,
    Tuesday: 3,
    Wednesday: 7,
    Thursday: 8,
    Friday: 6,
    Saturday: 9
  };

  const neptuPasaran = {
    Legi: 5,
    Pahing: 9,
    Pon: 7,
    Wage: 4,
    Kliwon: 8
  };

  const totalNeptu = neptuDay[weekday] + neptuPasaran[pasaran];

  return {
    weton: `${weekday} ${pasaran}`,
    totalNeptu,
    meaning: wetonMeanings[totalNeptu] || "Unknown",
    dayTrait: dayTraits[weekday],
    pasaranTrait: pasaranTraits[pasaran]
  };
}

// Navigation Logic
document.getElementById("startBtn").addEventListener("click", () => {
  switchScreen("home-screen", "input-screen");
});

document.getElementById("revealBtn").addEventListener("click", () => {
  const birthDate = document.getElementById("birthDate").value;
  if (!birthDate) {
    alert("Please enter a birth date.");
    return;
  }
  const result = getWeton(birthDate);
  document.getElementById("wetonResult").innerHTML = `
    <div><b>Your Weton:</b> ${result.weton}</div>
    <div><b>Total Neptu:</b> ${result.totalNeptu}</div>
    <div><b>Wadah:</b> ${result.meaning}</div>
    <div><b>Action:</b> ${result.dayTrait}</div>
    <div><b>Spirit:</b> ${result.pasaranTrait}</div>
  `;
  switchScreen("input-screen", "result-screen");
});

document.getElementById("backBtn").addEventListener("click", () => {
  switchScreen("result-screen", "home-screen");
});

function switchScreen(fromId, toId) {
  document.getElementById(fromId).classList.remove("active");
  document.getElementById(fromId).classList.add("hidden");
  document.getElementById(toId).classList.remove("hidden");
  document.getElementById(toId).classList.add("active");
}
