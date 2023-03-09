// kanvas
const lebarBalok = 25; // lebar balok
const baris = 20; // jumlah baris
const kolom = 20; // jumlah kolom
let kanvas;
let context;
let snakeBody = []; // array dari kotak-kotak
let gameOver;

// ular
let posisiX = lebarBalok * 5; // posisi ular berdasarkan sumbu X
let posisiY = lebarBalok * 5; // posisi ular berdasarkan sumbu Y
let gerakX = 0; // pergerakan sumbu X (kiri/kanan)
let gerakY = 0; // pergerakan sumbu Y (atas/bawah)
// makanan
let makananX; // posisi makanan berdasarkan sumbu X
let makananY; // posisi makanan berdasarkan sumbu Y

// awal
window.onload = () => {
  kanvas = document.getElementById('kanvas');
  kanvas.height = baris * lebarBalok;
  kanvas.width = kolom * lebarBalok;
  context = kanvas.getContext('2d');
  posisiMakanan();
  document.addEventListener('keyup', pindahArah);
  setInterval(update, 1000 / 10);
};

// pembaruan

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = 'black';
  context.fillRect(0, 0, kanvas.height, kanvas.width);
  context.fillStyle = 'red';
  context.fillRect(makananX, makananY, lebarBalok, lebarBalok);

  // jika ular kena makanan

  if (makananX == posisiX && makananY == posisiY) {
    snakeBody.push([makananX, makananY]);
    let audio = new Audio('mixkit-bonus-earned-in-video-game-2058.wav');
    audio.play();
    posisiMakanan();
    let teks = document.getElementById('skor');
    teks.innerHTML = snakeBody.length;
  }
  // tambah badan ular
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [posisiX, posisiY];
  }
  context.fillStyle = 'green';
  posisiX += gerakX * lebarBalok;
  posisiY += gerakY * lebarBalok;
  context.fillRect(posisiX, posisiY, lebarBalok, lebarBalok);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], lebarBalok, lebarBalok);
  }

  // game over

  for (let i = 0; i < snakeBody.length; i++) {
    if (posisiX == snakeBody[i][0] && posisiY == snakeBody[i][1]) {
      gameOver = true;
      let audio = new Audio('mixkit-wrong-answer-fail-notification-946.wav');
      audio.play();
      alert('game over');
    }
  }
  if (posisiX < 0 || posisiY < 0 || posisiX > kolom * lebarBalok || posisiY > baris * lebarBalok) {
    gameOver = true;
    let audio = new Audio('mixkit-wrong-answer-fail-notification-946.wav');
    audio.play();
    alert('game over');
  }
}

function pindahArah(e) {
  if (e.code == 'ArrowUp' && gerakY != 1) {
    gerakX = 0;
    gerakY = -1;
  } else if (e.code == 'ArrowDown' && gerakY != -1) {
    gerakX = 0;
    gerakY = +1;
  } else if (e.code == 'ArrowRight' && gerakX != -1) {
    gerakX = +1;
    gerakY = 0;
  } else if (e.code == 'ArrowLeft' && gerakX != 1) {
    gerakX = -1;
    gerakY = 0;
  }
}

// pengacakan posisi makanan
function posisiMakanan() {
  makananX = Math.floor(Math.random() * kolom) * lebarBalok;
  makananY = Math.floor(Math.random() * baris) * lebarBalok;
}
