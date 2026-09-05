/* Base styling & Background Image */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-align: center;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url('img/bg.jpg'), url('img/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow-x: hidden;
}

/* Kotak Kad Utama (Center & Fixed Size iPhone) */
.card-container {
  width: 90%;
  max-width: 393px;
  padding: 24px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  position: relative;
  margin: auto;
  overflow: hidden;
  transition: transform 0.1s ease;
}

/* Lock Screen Layout (Page 1) */
#lockScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-text h1 {
  font-size: 26px;
  margin-bottom: 5px;
  margin-top: 0;
}

.header-text p {
  font-size: 14px;
  color: #cccccc;
  margin-top: 0;
  margin-bottom: 25px;
}

/* Indicating dots (••••) */
.pin-display {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
  width: 100%;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background: transparent;
  transition: background 0.2s ease;
}

.dot.filled {
  background: #ffffff;
}

.divider {
  width: 70%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0 auto 30px auto;
}

/* Keypad Grid 3x4 */
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
}

.key {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  transition: background 0.2s, transform 0.1s;
}

.key:active {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(0.95);
}

.action-key {
  font-size: 18px;
  background: rgba(255, 255, 255, 0.08);
}

.error {
  color: #ff4d4d;
  margin-top: 20px;
  font-size: 14px;
  min-height: 20px;
}

.hidden {
  display: none !important;
}

/* PAGE STYLING */
#page2, #pageRepeat, #page3, #postJumpscarePage, #finalPage, #fakeTextPage {
  position: relative;
}

.gif-box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.page2-gif {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.page2-text h2 {
  font-size: 20px;
  margin-bottom: 25px;
  font-weight: 600;
}

.btn-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  height: 80px;
  position: relative;
}

#yesBtn, #noBtn, #yeAwakBtn, #hehBtn, #nextBtn, #nextBtn2, #jumpscareBtn {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

#yesBtn, #yeAwakBtn {
  background: #28a745;
  color: white;
  transition: transform 0.15s ease, background 0.2s ease;
}

#yesBtn:hover, #yeAwakBtn:hover {
  background: #218838;
  transform: scale(1.08);
}

#noBtn {
  background: #dc3545;
  color: white;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

#hehBtn, #nextBtn, #nextBtn2, #jumpscareBtn {
  background: #007bff;
  color: white;
  transition: transform 0.15s ease, background 0.2s ease;
}

#hehBtn:hover, #nextBtn:hover, #nextBtn2:hover, #jumpscareBtn:hover {
  background: #0056b3;
  transform: scale(1.08);
}

/* Button MESSAGE */
.message-btn-group {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
  height: auto;
}

.msg-btn {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  background: #007bff;
  color: white;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
}

.msg-btn:hover {
  background: #0056b3;
  transform: scale(1.08);
}

/* Main Content Box */
.birthday-box {
  width: 100%;
  box-sizing: border-box;
  animation: fadeIn 0.8s ease-in-out;
}

.section {
  margin-top: 10px;
  padding: 10px;
  white-space: pre-line;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* EFEK GLITCH CREEPY */
.glitch-mode {
  animation: glitchAnim 0.15s infinite;
  filter: invert(0.8) hue-rotate(90deg);
}

.glitch-mode .card-container {
  animation: cardShake 0.08s infinite;
  box-shadow: -5px 0 red, 5px 0 cyan;
}

@keyframes glitchAnim {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}

@keyframes cardShake {
  0% { transform: skewX(0deg); }
  25% { transform: skewX(-5deg) scale(1.02); }
  75% { transform: skewX(5deg) scale(0.98); }
  100% { transform: skewX(0deg); }
}

/* JUMPSCARE & BLACK SCREEN OVERLAY STYLING */
.jumpscare-overlay, .black-screen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}

#jumpscareImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: jumpscareZoom 0.1s infinite alternate;
}

@keyframes jumpscareZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
