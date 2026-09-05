// ==========================================
// 1. TELEGRAM VISITOR TRACKER & PAGE TRACKER
// ==========================================
const TELEGRAM_TOKEN = "8882906655:AAHWDAMdPMyKREirHal-o-BU4GP3EvinNIc"; 
const TELEGRAM_CHAT_ID = "6825248223"; 

function sendVisitorNotification() {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;

  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      const waktu = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
      const device = navigator.userAgent;
      
      const ip = data.ip || "Tidak diketahui";
      const bandar = data.city || "Tidak diketahui";
      const negeri = data.region || "Tidak diketahui";
      const isp = data.org || "Tidak diketahui";

      const message = `🔔 *Ada Orang Buka Website Sorry!*%0A%0A📅 *Waktu:* ${waktu}%0A📍 *Lokasi:* ${bandar}, ${negeri}%0A🌐 *IP / ISP:* ${ip} (${isp})%0A📱 *Device:* ${device}`;

      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=Markdown`;
      fetch(url);
    })
    .catch(() => {
      const waktu = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
      const message = `🔔 *Ada Orang Buka Website Sorry!*%0A%0A📅 *Waktu:* ${waktu}%0A📱 *Device:* ${navigator.userAgent}`;
      
      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=Markdown`;
      fetch(url);
    });
}

function trackPage(pageName) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;
  const waktu = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
  const message = `👀 *Status Pengguna:* Tengah tengok page *[ ${pageName} ]*%0A⏰ *Waktu:* ${waktu}`;
  
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=Markdown`;
  fetch(url).catch(err => console.log("Gagal hantar status page:", err));
}

window.addEventListener("DOMContentLoaded", () => {
  sendVisitorNotification();
  trackPage("Lock Screen / PIN");
});

// ==========================================
// 2. LOCKSCREEN PIN LOGIC (PAGE 1)
// ==========================================
let enteredPin = "";
const correctPin = "0131";

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
    trackPage("Page 2: Awak maafkan sy x ni?");
  } else {
    errorMsg.textContent = "PIN salah! Cuba lagi. Nampak sangat x suka sy 🥺";
    enteredPin = "";
    updateDots();
  }
}

// ==========================================
// 3. RUNAWAY BUTTON 'X' LOGIC (PAGE 2)
// ==========================================
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

// ==========================================
// 4. REPEAT PAGE LOGIC
// ==========================================
let clickCount = 0;
const randomTexts = [
  "Betul ni awak dh maafkan sy? 🤔",
  "Sumpah tak marah dah? 🥺",
  "Betul-betul ikhlas ni? 🥹",
  "Janji tak ungkit lagi? 🙈",
  "Serius la ye awak? 💖"
];

function goToRepeatPage() {
  clickCount = 0;
  document.getElementById("repeatText").textContent = randomTexts[0];
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("pageRepeat").classList.remove("hidden");
  trackPage("Page Repeat: Betul ni awak dh maafkan sy?");
}

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
    trackPage("Page 3: ok tq");

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }
}

// ==========================================
// 5. MAIN CONTENT + TYPING ANIMATION
// ==========================================
const fullText = `sy rasa ritu awak yg start dulu say "iluvu" pastu sekarang tetiba nk kawan, okay. Awak ok x ni?`;

let typeIndex = 0;

function startTypingEffect() {
  const container = document.getElementById("typedMessage");
  container.textContent = "";
  typeIndex = 0;

  function typeChar() {
    if (typeIndex < fullText.length) {
      container.textContent += fullText.charAt(typeIndex);
      typeIndex++;
      setTimeout(typeChar, 35);
    }
  }
  typeChar();
}

function goToMainContent() {
  const body = document.getElementById("mainBody");
  body.classList.add("glitch-mode");

  setTimeout(() => {
    body.classList.remove("glitch-mode");
    document.getElementById("page3").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
    trackPage("Main Content: Mesej Panjang (Typing Effect)");
    startTypingEffect();
  }, 1200);
}

// ==========================================
// 6. JUMPSCARE 1 LOGIC (3 SAAT) + TRACKING JAWAPAN (ya / X)
// ==========================================
function triggerJumpscare1(pilihanUser) {
  const bgMusic = document.getElementById("bgMusic");
  const screamSound = document.getElementById("screamSound");
  const jumpscareOverlay = document.getElementById("jumpscareContainer");
  const jumpscareImg = document.getElementById("jumpscareImg");

  // Hantar notification jawapan user ke Telegram
  if (pilihanUser) {
    trackPage(`MESSAGE: User tekan [ ${pilihanUser} ]`);
  }

  if (bgMusic) bgMusic.pause();

  jumpscareImg.src = "img/cat-jumpscare.jpg";
  jumpscareOverlay.classList.remove("hidden");
  trackPage("Jumpscare 1 Terkeluar!");

  if (screamSound) {
    screamSound.currentTime = 0;
    screamSound.volume = 1.0;
    screamSound.play().catch(err => console.log("Gagal main bunyi:", err));
  }

  setTimeout(() => {
    jumpscareOverlay.classList.add("hidden");
    if (screamSound) screamSound.pause();
    
    document.getElementById("mainContent").classList.add("hidden");
    document.getElementById("postJumpscarePage").classList.remove("hidden");
    trackPage("Page Post Jumpscare 1: terkejut ke??");
    
    if (bgMusic) bgMusic.play().catch(err => console.log("Gagal sambung lagu:", err));
  }, 3000);
}

// ==========================================
// 7. JUMPSCARE 2 LOGIC (3 SAAT)
// ==========================================
function triggerJumpscare2() {
  const bgMusic = document.getElementById("bgMusic");
  const screamSound = document.getElementById("screamSound");
  const jumpscareOverlay = document.getElementById("jumpscareContainer");
  const jumpscareImg = document.getElementById("jumpscareImg");

  if (bgMusic) bgMusic.pause();

  jumpscareImg.src = "img/cat-jumpscare2.jpg";
  jumpscareOverlay.classList.remove("hidden");
  trackPage("Jumpscare 2 Terkeluar!");

  if (screamSound) {
    screamSound.currentTime = 0;
    screamSound.volume = 1.0;
    screamSound.play().catch(err => console.log("Gagal main bunyi:", err));
  }

  setTimeout(() => {
    jumpscareOverlay.classList.add("hidden");
    if (screamSound) screamSound.pause();
    
    document.getElementById("postJumpscarePage").classList.add("hidden");
    document.getElementById("finalPage").classList.remove("hidden");
    trackPage("Page Final: ok sorry xde dh bye");
    
    if (bgMusic) bgMusic.play().catch(err => console.log("Gagal sambung lagu:", err));
  }, 3000);
}

// ==========================================
// 8. FAKE TEXT (2 SAAT) -> JUMPSCARE 3 (3 SAAT) -> BLACK SCREEN
// ==========================================
function triggerFakeTextThenJumpscare() {
  const bgMusic = document.getElementById("bgMusic");
  const screamSound = document.getElementById("screamSound");
  const jumpscareOverlay = document.getElementById("jumpscareContainer");
  const jumpscareImg = document.getElementById("jumpscareImg");
  const blackScreen = document.getElementById("blackScreen");

  document.getElementById("finalPage").classList.add("hidden");
  document.getElementById("fakeTextPage").classList.remove("hidden");
  trackPage("Page Fake Text: xde pape");

  setTimeout(() => {
    document.getElementById("fakeTextPage").classList.add("hidden");

    if (bgMusic) bgMusic.pause();

    jumpscareImg.src = "img/cat-jumpscare3.jpg";
    jumpscareOverlay.classList.remove("hidden");
    trackPage("Jumpscare 3 (Terakhir) Terkeluar!");

    if (screamSound) {
      screamSound.currentTime = 0;
      screamSound.volume = 1.0;
      screamSound.play().catch(err => console.log("Gagal main bunyi:", err));
    }

    setTimeout(() => {
      jumpscareOverlay.classList.add("hidden");
      if (screamSound) screamSound.pause();
      
      blackScreen.classList.remove("hidden");
      trackPage("Black Screen Final (Tamat)");
    }, 3000);

  }, 2000);
}
