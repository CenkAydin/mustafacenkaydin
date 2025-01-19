const loveTimer = document.getElementById("love-timer");
const startDate = new Date("2024-11-08T22:50:00");

function updateLoveTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  loveTimer.textContent = `${days} Gün, ${hours} Saat, ${minutes} Dakika, ${seconds} Saniye`;
}

setInterval(updateLoveTimer, 1000);

function showMessage(message) {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = message;

  setTimeout(() => {
    messageBox.textContent = "";
  }, 3000);
}

const heartContainer = document.querySelector('.heart-background');
const starContainer = document.querySelector('.star-background');

for (let i = 0; i < 20; i++) {
  const heart = document.createElement('span');
  heart.textContent = '❤️';
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heart.style.fontSize = `${1 + Math.random() * 2}rem`;
  heartContainer.appendChild(heart);

  const star = document.createElement('span');
  star.textContent = '✨';
  star.style.left = `${Math.random() * 100}vw`;
  star.style.animationDuration = `${5 + Math.random() * 5}s`;
  star.style.fontSize = `${1 + Math.random() * 2}rem`;
  starContainer.appendChild(star);
}
