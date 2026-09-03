// ==========================================
// 1. TELEGRAM VISITOR TRACKER (WITH IP & LOCATION)
// ==========================================
const TELEGRAM_TOKEN = "8882906655:AAHWDAMdPMyKREirHal-o-BU4GP3EvinNIc"; 
const TELEGRAM_CHAT_ID = "6825248223"; 

function sendVisitorNotification() {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;

  // Dapatkan maklumat IP & Lokasi dari API Percuma ipapi.co
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
      // Jika ipapi gagal / disekat adblocker, hantar mesej asas
      const waktu = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
      const message = `🔔 *Ada Orang Buka Website Sorry!*%0A%0A📅 *Waktu:* ${waktu}%0A📱 *Device:* ${navigator.userAgent}`;
      
      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=Markdown`;
      fetch(url);
    });
}

// Jalankan tracker sebaik sahaja halaman dimuatkan
window.addEventListener("DOMContentLoaded", () => {
  sendVisitorNotification();
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
// 5. MAIN CONTENT & TAB NAVIGATION
// ==========================================
function goToMainContent() {
  document.getElementById("page3").classList.add("hidden");
  document.getElementById("mainContent").classList.remove("hidden");
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
