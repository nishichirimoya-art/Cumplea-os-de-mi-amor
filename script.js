
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const sections = [
  { id: "hero", el: $("#hero") },
  { id: "spring", el: $("#spring") },
  { id: "korean", el: $("#korean") },
  { id: "aquarium", el: $("#aquarium") },
  { id: "art", el: $("#art") },
  { id: "desserts", el: $("#desserts") },
  { id: "final", el: $("#final") }
];

const progressBar = $("#progressBar");
function showSection(id) {
  sections.forEach((section, index) => {
    section.el.classList.toggle("hidden", section.id !== id);
    if (section.id === id) {
      const progress = (index / (sections.length - 1)) * 100;
      progressBar.style.width = progress + "%";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/* =========================
   MÚSICA
========================= */
const music = $("#bgMusic");
const musicBtn = $("#musicBtn");
let musicOn = false;

async function playMusic() {
  try {
    await music.play();
    musicOn = true;
    musicBtn.textContent = "❚❚";
  } catch (e) {
    musicOn = false;
    musicBtn.textContent = "♫";
  }
}

musicBtn.addEventListener("click", async () => {
  if (musicOn) {
    music.pause();
    musicOn = false;
    musicBtn.textContent = "♫";
  } else {
    await playMusic();
  }
});

/* =========================
   NAVEGACIÓN PRINCIPAL
========================= */
$("#openJourneyBtn").addEventListener("click", async () => {
  await playMusic();
  burstConfetti(45);
  showSection("spring");
});

$("#toKoreanBtn").addEventListener("click", () => showSection("korean"));
$("#toAquariumBtn").addEventListener("click", () => showSection("aquarium"));
$("#toArtBtn").addEventListener("click", () => showSection("art"));
$("#toDessertsBtn").addEventListener("click", () => showSection("desserts"));
$("#toFinalBtn").addEventListener("click", () => {
  showSection("final");
  burstConfetti(120);
});
$("#restartBtn").addEventListener("click", () => {
  location.reload();
});

/* =========================
   PRIMAVERA - FLORES
========================= */
let flowerCount = 0;
const flowerButtons = $$(".flower-btn");
flowerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("found")) return;
    btn.classList.add("found");
    flowerCount++;
    $("#flowerCount").textContent = flowerCount;
    $("#springStatus").textContent = "Qué bonito... ya encontraste " + flowerCount + " florecitas ♡";

    if (flowerCount === 5) {
      $("#springStatus").textContent = "¡Encontraste todas! El jardín te abre el siguiente mundo ✨";
      $("#toKoreanBtn").classList.remove("hidden");
      burstConfetti(36);
    }
  });
});

/* =========================
   COREANO - FORTUNES
========================= */
const fortunes = [
  {
    title: "Un mensajito para tu sonrisa ♡",
    text: "Que nunca te falten los pequeños momentos bonitos: una canción, una salida, una foto espontánea y personas que te hagan sentir especial."
  },
  {
    title: "Un deseo para tus 18 ✦",
    text: "Deseo que esta nueva etapa te regale confianza, aventuras y recuerdos que te hagan sonreír cuando mires hacia atrás."
  },
  {
    title: "Algo lindo para ti 🎀",
    text: "Si pudiera resumir este detalle en una frase sería esta: quería que supieras que eres una chica muy especial."
  }
];
$$(".fortune-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = fortunes[Number(btn.dataset.fortune)];
    $("#fortuneTitle").textContent = item.title;
    $("#fortuneText").textContent = item.text;
  });
});

/* =========================
   ACUARIO - PECES
========================= */
const fishMessages = [
  { title: "Pez 1", text: "Incluso bajo el agua, esta sorpresa sigue recordándote lo especial que eres." },
  { title: "Pez 2", text: "A veces las cosas más bonitas no son enormes, sino los pequeños detalles hechos con cariño." },
  { title: "Pez 3", text: "Tú haces que los recuerdos se sientan más lindos y los momentos se queden más tiempo." },
  { title: "Pez 4", text: "Ya casi llegas a otra sorpresa. Sigue tocando este pequeño universo hecho para ti ♡" }
];
let fishSeen = 0;
$$(".fish").forEach(fish => {
  fish.addEventListener("click", () => {
    if (!fish.classList.contains("done")) {
      fish.classList.add("done");
      fishSeen++;
      $("#fishCount").textContent = fishSeen;
    }
    const msg = fishMessages[Number(fish.dataset.fish)];
    $("#fishTitle").textContent = msg.title;
    $("#fishText").textContent = msg.text;

    if (fishSeen === 4) {
      $("#toArtBtn").classList.remove("hidden");
      $("#fishText").textContent = "Ya activaste a todos los pececitos. El acuario te deja pasar al siguiente capítulo 🎨";
      burstConfetti(36);
    }
  });
});

/* =========================
   ARTE - ROMPECABEZAS
========================= */
const puzzleBoard = $("#puzzleBoard");
let puzzlePieces = [];
let selectedPiece = null;
let puzzleSolved = false;

function createPuzzle() {
  const indexes = [...Array(9).keys()];
  const shuffled = shuffleArray(indexes.slice());
  if (isSolved(shuffled)) [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  puzzlePieces = shuffled;
  renderPuzzle();
  $("#puzzleStatus").textContent = "Arma la foto para desbloquear la siguiente sorpresa.";
  $("#toDessertsBtn").classList.add("hidden");
  puzzleSolved = false;
}

function renderPuzzle() {
  puzzleBoard.innerHTML = "";
  puzzlePieces.forEach((originalIndex, displayIndex) => {
    const piece = document.createElement("button");
    piece.type = "button";
    piece.className = "piece";
    piece.dataset.display = displayIndex;
    piece.dataset.original = originalIndex;

    const row = Math.floor(originalIndex / 3);
    const col = originalIndex % 3;

    piece.style.backgroundImage = "url('assets/img/foto5.jpeg')";
    piece.style.backgroundPosition = `${col * 50}% ${row * 50}%`;

    piece.addEventListener("click", () => {
      if (puzzleSolved) return;

      if (selectedPiece === null) {
        selectedPiece = displayIndex;
        piece.classList.add("selected");
      } else {
        swapPieces(selectedPiece, displayIndex);
        selectedPiece = null;
        renderPuzzle();
        checkPuzzleSolved();
      }
    });

    if (selectedPiece === displayIndex) piece.classList.add("selected");
    puzzleBoard.appendChild(piece);
  });
}

function swapPieces(a, b) {
  [puzzlePieces[a], puzzlePieces[b]] = [puzzlePieces[b], puzzlePieces[a]];
}

function isSolved(arr) {
  return arr.every((value, index) => value === index);
}

function checkPuzzleSolved() {
  if (isSolved(puzzlePieces)) {
    puzzleSolved = true;
    $("#puzzleStatus").textContent = "¡Rompecabezas completo! Se desbloqueó el mundo de postres 🍮";
    $("#toDessertsBtn").classList.remove("hidden");
    burstConfetti(60);
  }
}

$("#shufflePuzzleBtn").addEventListener("click", createPuzzle);
createPuzzle();

/* =========================
   DESSERTS - MEMORY GAME
========================= */
const memoryBoard = $("#memoryBoard");
const desserts = ["🍓","🍰","🧁","🍮","🍪","🍩"];
let memoryCards = [];
let flipped = [];
let matchedCount = 0;
let lockBoard = false;

function setupMemoryGame() {
  const values = shuffleArray([...desserts, ...desserts]);
  memoryBoard.innerHTML = "";
  memoryCards = [];
  flipped = [];
  matchedCount = 0;
  lockBoard = false;

  values.forEach((value, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.dataset.value = value;
    card.dataset.index = index;
    card.innerHTML = `
      <span class="memory-front">♡</span>
      <span class="memory-back">${value}</span>
    `;
    card.addEventListener("click", () => handleMemoryClick(card));
    memoryBoard.appendChild(card);
    memoryCards.push(card);
  });

  $("#memoryStatus").textContent = "Empareja todas las cartas de postres.";
  $("#toFinalBtn").classList.add("hidden");
  $("#purinPanel").classList.remove("unlocked");
}

function handleMemoryClick(card) {
  if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    lockBoard = true;
    const [a, b] = flipped;
    if (a.dataset.value === b.dataset.value) {
      a.classList.add("matched");
      b.classList.add("matched");
      flipped = [];
      matchedCount += 2;
      lockBoard = false;

      if (matchedCount === memoryCards.length) {
        $("#memoryStatus").textContent = "¡Completaste el minijuego! Se desbloqueó la sorpresa dulce ♡";
        $("#purinPanel").classList.add("unlocked");
        $("#toFinalBtn").classList.remove("hidden");
        burstConfetti(70);
      }
    } else {
      setTimeout(() => {
        a.classList.remove("flipped");
        b.classList.remove("flipped");
        flipped = [];
        lockBoard = false;
      }, 700);
    }
  }
}
setupMemoryGame();

/* =========================
   FINAL - QR
========================= */
const ACCESS_URL = "https://nishichirimoya-art.github.io/FELIZ-CUMPLEA-OS-UWU/";
const qrImg = $("#qrImage");
const qrUrlText = $("#qrUrlText");

function updateQRCode() {
  qrImg.src = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(ACCESS_URL)}`;
  qrUrlText.textContent = ACCESS_URL;
}
updateQRCode();

/* =========================
   CONFETI
========================= */
const confettiLayer = $("#confettiLayer");
const confettiColors = ["#ef9fbd","#ffd9a7","#c3e8ff","#d7c0ff","#ffffff"];
function burstConfetti(amount = 80) {
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDuration = 2.8 + Math.random() * 2.8 + "s";
    piece.style.animationDelay = Math.random() * .5 + "s";
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 6000);
  }
}
$("#confettiBtn").addEventListener("click", () => burstConfetti(120));

/* =========================
   HELPERS
========================= */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* =========================
   PARTÍCULAS DE FONDO
========================= */
const canvas = $("#particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(110, Math.floor(window.innerWidth * window.innerHeight / 12000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2.2 + .4,
    speed: Math.random() * .08 + .02,
    alpha: Math.random() * .45 + .12
  }));
}

function drawParticles(time = 0) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach(p => {
    p.y += p.speed;
    if (p.y > window.innerHeight + 5) {
      p.y = -5;
      p.x = Math.random() * window.innerWidth;
    }
    const twinkle = .6 + Math.sin(time * .001 + p.x) * .25;
    ctx.beginPath();
    ctx.fillStyle = `rgba(220, 127, 166, ${p.alpha * twinkle})`;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
requestAnimationFrame(drawParticles);

/* Inicial */
showSection("hero");
