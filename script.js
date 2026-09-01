let enteredPin = "";
const correctPin = "0131";

/* Pembolehubah untuk Repeat Page */
let clickCount = 0;
const randomTexts = [
  "Betul ni awak dh maafkan sy? 🤔",
  "Sumpah tak marah dah? 🥺",
  "Betul-betul ikhlas ni? 🥹",
  "Janji tak ungkit lagi? 🙈",
  "Serius la ye awak? 💖"
];

/* Logik PIN Keypad (Page 1) */
function pressKey(num) {
  if (enteredPin.length < 4) {
    enteredPin += num;
    updateDots();
  }
  
  if (enteredPin.length === 4) {
    setTimeout(submitPin, 200);
  }
}

function clearPin() {
  enteredPin = "";
  updateDots();
  document.getElementById("errorMsg").textContent = "";
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index < enteredPin.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
}

function submitPin() {
  const errorMsg = document.getElementById("errorMsg");
  const bgMusic = document.getElementById("bgMusic");

  if (enteredPin === correctPin) {
    if (bgMusic) {
      bgMusic.volume = 0.15;
      bgMusic.play().catch(err => {
        console.log("Autoplay ditahan oleh browser:", err);
      });
    }

    document.getElementById("lockScreen").classList.add("hidden");
    document.getElementById("page2").classList.remove("hidden");
  } else {
    errorMsg.textContent = "PIN salah! Cuba lagi. Nampak sangat x suka sy 🥺";
    enteredPin = "";
    updateDots();
  }
}

/* Logik Button 'X' Lari */
function moveButton() {
  const noBtn = document.getElementById("noBtn");
  const btnGroup = document.querySelector("#page2 .btn-group");

  noBtn.style.position = "absolute";

  const groupWidth = btnGroup.clientWidth;
  const groupHeight = btnGroup.clientHeight;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = groupWidth - btnWidth;
  const maxY = groupHeight - btnHeight;

  const randomX = Math.max(0, Math.floor(Math.random() * maxX));
  const randomY = Math.max(0, Math.floor(Math.random() * maxY));

  const randomRotate = Math.floor(Math.random() * 30) - 15;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transform = `rotate(${randomRotate}deg)`;
}

/* Tekan 'yee' di Page 2 -> Buka Repeat Page */
function goToRepeatPage() {
  clickCount = 0;
  document.getElementById("repeatText").textContent = randomTexts[0];
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("pageRepeat").classList.remove("hidden");
}

/* Tekan 'ye awak' -> Repeat 5 kali dengan teks rawak */
function handleYeAwakClick() {
  clickCount++;

  if (clickCount < 5) {
    const randomIndex = Math.floor(Math.random() * randomTexts.length);
    document.getElementById("repeatText").textContent = randomTexts[randomIndex];
    
    const card = document.getElementById("pageRepeat");
    card.style.transform = "scale(0.98)";
    setTimeout(() => { card.style.transform = "scale(1)"; }, 100);

  } else {
    document.getElementById("pageRepeat").classList.add("hidden");
    document.getElementById("page3").classList.remove("hidden");

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }
}

/* Tekan 'heh' di Page 3 -> Masuk Page Last (Main Content) */
function goToMainContent() {
  document.getElementById("page3").classList.add("hidden");
  document.getElementById("mainContent").classList.remove("hidden");
}

/* Logik Tukar Tab Section (Page Last) */
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}