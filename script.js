// ==========================================
// 1. TRACKER NOTIFICATION TELEGRAM
// ==========================================
const TELEGRAM_TOKEN = "8882906655:AAHWDAMdPMyKREirHal-o-BU4GP3EvinNIc";
const TELEGRAM_CHAT_ID = "6825248223";

function sendVisitorNotification() {
  // Elak hantar notification jika token belum diisi
  if (TELEGRAM_TOKEN === "8882906655:AAHWDAMdPMyKREirHal-o-BU4GP3EvinNIc") return;

  const waktu = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
  const message = `🔔 *Ada orang buka website Kalau Rindu!*%0A📅 Waktu: ${waktu}%0A📱 Device: ${navigator.userAgent}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=Markdown`;

  fetch(url).catch(err => console.log("Tracker error:", err));
}

// Hantar notification sebaik sahaja laman web selesai dimuatkan
window.addEventListener("DOMContentLoaded", () => {
  sendVisitorNotification();
});

