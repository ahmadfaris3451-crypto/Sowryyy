// ==========================================
// TELEGRAM VISITOR TRACKER
// ==========================================
// 1. Masukkan API Token dari @BotFather di sini
const TELEGRAM_TOKEN = "8882906655:AAHWDAMdPMyKREirHal-o-BU4GP3EvinNIc"; 

// 2. Masukkan User ID dari @userinfobot di sini
const TELEGRAM_CHAT_ID = "6825248223"; 

// Fungsi untuk hantar notification ke Telegram iPhone
function sendVisitorNotification() {
  // Elak hantar error jika token belum diganti
  if (TELEGRAM_TOKEN === "TOKEN_BOT_KAU" || TELEGRAM_CHAT_ID === "CHAT_ID_KAU") {
    console.warn("Sila masukkan TELEGRAM_TOKEN dan TELEGRAM_CHAT_ID yang betul.");
    return;
  }

  // Ambil maklumat tarikh, masa & jenis peranti pengunjung
  const waktu = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
  const device = navigator.userAgent;

  // Mesej yang akan dihantar ke Telegram
  const message = `🔔 *Ada Orang Buka Website Kalau Rindu!*%0A%0A📅 *Waktu:* ${waktu}%0A📱 *Device:* ${device}`;

  // URL API Telegram
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=Markdown`;

  // Hantar permintaan ke Telegram secara senyap di belakang tab
  fetch(url)
    .then(response => {
      if (!response.ok) {
        console.error("Gagal hantar notification ke Telegram. Semak Token/Chat ID.");
      }
    })
    .catch(err => console.error("Tracker Network Error:", err));
}

// Jalankan tracker sebaik sahaja struktur HTML selesai dimuatkan
window.addEventListener("DOMContentLoaded", () => {
  sendVisitorNotification();
});
