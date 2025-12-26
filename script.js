// === KONFIGURACJA GRY ===
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === POZIOMY ===
const LEVEL_CONFIG = 
[
  { speed: 5.1, density: 0.051, jump: 16.5, moveSpeed: 8.1, scoreToNext: 11, scaleMin: 0.81, scaleMax: 1.21, colors: ["#ff5555","#ffaa00"] }, // 2 lvl
  { speed: 7.1, density: 0.061, jump: 17.4, moveSpeed: 9.1, scoreToNext: 27, scaleMin: 0.709, scaleMax: 1.408, colors: ["#ff8800","#d1aa0eff"] },
  { speed: 9.2, density: 0.071, jump: 18.3, moveSpeed: 10.1, scoreToNext: 48, scaleMin: 0.608, scaleMax: 1.506, colors: ["#1dcfb1ff","#18a5d8ff"] },
  { speed: 11.1, density: 0.081, jump: 19.4, moveSpeed: 11.1, scoreToNext: 75, scaleMin: 0.507, scaleMax: 1.607, colors: ["#ff00cc","#ba1ce1ff"] },
  { speed: 13.05, density: 0.091, jump: 20.5, moveSpeed: 12.1, scoreToNext: 105, scaleMin: 0.406, scaleMax: 1.703, colors: ["#00ff88","#1ac1b9ff"] },
  { speed: 14.95, density: 0.109, jump: 21.2, moveSpeed: 12.6, scoreToNext: 140, scaleMin: 0.3713, scaleMax: 1.752, colors: ["#491ddcff","#ab1750ff"] },
  { speed: 16.93, density: 0.129, jump: 20.9, moveSpeed: 13.1, scoreToNext: 190, scaleMin: 0.3426, scaleMax: 1.781, colors: ["#ff4400ff","#45e725ff"] },
  { speed: 18.91, density: 0.148, jump: 20, moveSpeed: 13.6, scoreToNext: 241, scaleMin: 0.3124, scaleMax: 1.819, colors: ["#00ccff","#0d2dafff"] }, // 9 lvl 
  { speed: 20.88, density: 0.167, jump: 19, moveSpeed: 14.1, scoreToNext: 313, scaleMin: 0.2822, scaleMax: 1.849, colors: ["#dbdb1eff","#84122bff"] },
  { speed: 22.85, density: 0.186, jump: 18, moveSpeed: 14.4, scoreToNext: 392, scaleMin: 0.2521, scaleMax: 1.885, colors: ["#3726d1ff","#167027ff"] },
  { speed: 24.83, density: 0.205, jump: 17, moveSpeed: 14.7, scoreToNext: 469, scaleMin: 0.2319, scaleMax: 1.928, colors: ["#9a29d2ff","#79087cff"] },
  { speed: 26.81, density: 0.225, jump: 16, moveSpeed: 14.9, scoreToNext: 563, scaleMin: 0.2117, scaleMax: 1.959, colors: ["#a8e12bff","#eec41dff","#d41d57e6"] },
  { speed: 28.79, density: 0.244, jump: 15, moveSpeed: 15.0, scoreToNext: 667, scaleMin: 0.2056, scaleMax: 1.973, colors: ["#3118d6ff","#1886e0ff"] },
  { speed: 30.77, density: 0.263, jump: 14, moveSpeed: 15.2, scoreToNext: 786, scaleMin: 0.2011, scaleMax: 1.987, colors: ["#c3d630ff","#1cd277ff"] },  // 15lvl
  { speed: 32.75, density: 0.273, jump: 13.5, moveSpeed: 15.4, scoreToNext: 918, scaleMin: 0.19, scaleMax: 2.008, colors: ["#eb6c12ff","#e918a7ff"] }, 
  { speed: 34.71, density: 0.294, jump: 13, moveSpeed: 15.6, scoreToNext: 1085, scaleMin: 0.18, scaleMax: 2.046, colors: ["#0de466ff","#15b6dfff"] },
  { speed: 36.67, density: 0.309, jump: 13.2, moveSpeed: 15.9, scoreToNext: 1291, scaleMin: 0.17, scaleMax: 2.094, colors: ["#a8f542ff","#1a14c6ff"] },
  { speed: 38.63, density: 0.321, jump: 13.4, moveSpeed: 16.3, scoreToNext: 1534, scaleMin: 0.16, scaleMax: 2.133, colors: ["#cd334dff","#a62465ff"] },
  { speed: 40.58, density: 0.334, jump: 13.6, moveSpeed: 16.6, scoreToNext: 1803, scaleMin: 0.15, scaleMax: 2.172, colors: ["#a0de24ff","#1ba074ff","#3366d5e6"] }, // 20lvl
  { speed: 43.1, density: 0.351, jump: 13.8, moveSpeed: 16.9, scoreToNext: 2120, scaleMin: 0.143, scaleMax: 2.211, colors: ["#eb6c12ff","#e918a7ff","#92b70ce6"] }, 
  { speed: 45.4, density: 0.368, jump: 13.9, moveSpeed: 17.4, scoreToNext: 2493, scaleMin: 0.1367, scaleMax: 2.256, colors: ["#0de466ff","#15b6dfff","#4eace6e6"] }, 
  { speed: 47.9, density: 0.388, jump: 14.0, moveSpeed: 17.9, scoreToNext: 2927, scaleMin: 0.1298, scaleMax: 2.297, colors: ["#7dd10fff","#1482c6ff","#36d633e6"] },
  { speed: 50.7, density: 0.411, jump: 14.1, moveSpeed: 18.6, scoreToNext: 3444, scaleMin: 0.1245, scaleMax: 2.338, colors: ["#cd334dff","#a62465ff","#d74cbde6"] },
  { speed: 53.6, density: 0.436, jump: 14.2, moveSpeed: 19.2, scoreToNext: 4064, scaleMin: 0.1198, scaleMax: 2.379, colors: ["#a0de24ff","#1ba074ff","#3366d5e6"] }, //25lvl
  { speed: 56.8, density: 0.463, jump: 13.0, moveSpeed: 19.8, scoreToNext: 4755, scaleMin: 0.113, scaleMax: 2.43, colors: ["#1f139fff","#87431eff","#e64f84e6"] },
  { speed: 60.1, density: 0.498, jump: 12.6, moveSpeed: 20.4, scoreToNext: 5564, scaleMin: 0.107, scaleMax: 2.48, colors: ["#6c4a05ff","#72a0acff","#135a2ce6"] },
  { speed: 64.2, density: 0.528, jump: 12.2, moveSpeed: 21.1, scoreToNext: 6511, scaleMin: 0.098, scaleMax: 2.54, colors: ["#f4780bff","#031622ff","#2e7bf8e6"] },
  { speed: 68.7, density: 0.561, jump: 12.3, moveSpeed: 21.3, scoreToNext: 7616, scaleMin: 0.095, scaleMax: 2.597, colors: ["#762936ff","#470727ff","#15441ce6"] },
  { speed: 73.6, density: 0.606, jump: 12.4, moveSpeed: 21.5, scoreToNext: 8910, scaleMin: 0.092, scaleMax: 2.652, colors: ["#53770dff","#18e29fff","#819ddbe6"] },
  { speed: 78.9, density: 0.655, jump: 12.5, moveSpeed: 21.8, scoreToNext: 10433, scaleMin: 0.088, scaleMax: 2.719, colors: ["#8bca0dff","#4e15eaff","#e60f07e6"] }, //30lvl
  { speed: 84.7, density: 0.709, jump: 12.7, moveSpeed: 22.1, scoreToNext: 12227, scaleMin: 0.084, scaleMax: 2.773, colors: ["#24de2dff","#1ba074ff","#3366d5e6"] },
  { speed: 90.9, density: 0.768, jump: 12.8, moveSpeed: 22.4, scoreToNext: 14342, scaleMin: 0.080, scaleMax: 2.832, colors: ["#eb6c12ff","#e918a7ff","#92b70ce6"] }, 
  { speed: 97.5, density: 0.832, jump: 12.9, moveSpeed: 22.7, scoreToNext: 16838, scaleMin: 0.076, scaleMax: 2.899, colors: ["#0de466ff","#15b6dfff","#4eace6e6"] }, 
  { speed: 105.2, density: 0.902, jump: 13.0, moveSpeed: 23.0, scoreToNext: 19783, scaleMin: 0.071, scaleMax: 2.971, colors: ["#7dd10fff","#1482c6ff","#36d633e6"] },
  { speed: 113.3, density: 0.981, jump: 13.1, moveSpeed: 23.4, scoreToNext: 23267, scaleMin: 0.067, scaleMax: 3.049, colors: ["#cd334dff","#a62465ff","#d74cbde6"] }, //35lvl
  { speed: 124.2, density: 1.065, jump: 13.3, moveSpeed: 23.5, scoreToNext: 27455, scaleMin: 0.063, scaleMax: 3.123, colors: ["#1f139fff","#87431eff","#e64f84e6"] },
  { speed: 136.2, density: 1.158, jump: 13.5, moveSpeed: 23.6, scoreToNext: 32543, scaleMin: 0.058, scaleMax: 3.201, colors: ["#6c4a05ff","#72a0acff","#135a2ce6"] },
  { speed: 149.6, density: 1.256, jump: 13.7, moveSpeed: 23.7, scoreToNext: 38715, scaleMin: 0.056, scaleMax: 3.293, colors: ["#f4780bff","#031622ff","#2e7bf8e6"] },
  { speed: 164.4, density: 1.372, jump: 13.9, moveSpeed: 23.8, scoreToNext: 46265, scaleMin: 0.054, scaleMax: 3.391, colors: ["#762936ff","#470727ff","#15441ce6"] },
  { speed: 180.8, density: 1.495, jump: 14.2, moveSpeed: 24.0, scoreToNext: 55518, scaleMin: 0.052, scaleMax: 3.499, colors: ["#53770dff","#18e29fff","#819ddbe6"] },//40lvl
  { speed: 198.9, density: 1.650, jump: 14.5, moveSpeed: 24.1, scoreToNext: 67176, scaleMin: 0.051, scaleMax: 3.617, colors: ["#cd334dff","#a62465ff","#d74cbde6"] },
  { speed: 219.7, density: 1.813, jump: 14.8, moveSpeed: 24.2, scoreToNext: 81619, scaleMin: 0.050, scaleMax: 3.739, colors: ["#a0de24ff","#1ba074ff","#3366d5e6"] }, //42lvl
  { speed: 243.9, density: 2.003, jump: 15.1, moveSpeed: 24.3, scoreToNext: 99576, scaleMin: 0.049, scaleMax: 3.867, colors: ["#1f139fff","#87431eff","#e64f84e6"] },
  { speed: 271.9, density: 2.220, jump: 15.4, moveSpeed: 24.4, scoreToNext: 121980, scaleMin: 0.048, scaleMax: 3.998, colors: ["#6c4a05ff","#72a0acff","#135a2ce6"] },
  { speed: 304.5, density: 2.466, jump: 15.6, moveSpeed: 24.5, scoreToNext: 150036, scaleMin: 0.047, scaleMax: 4.150, colors: ["#f4780bff","#031622ff","#2e7bf8e6"] }, //45lvl
  { speed: 342.6, density: 2.750, jump: 15.7, moveSpeed: 24.6, scoreToNext: 185294, scaleMin: 0.046, scaleMax: 4.335, colors: ["#762936ff","#470727ff","#15441ce6"] },
  { speed: 387.2, density: 3.068, jump: 15.8, moveSpeed: 24.7, scoreToNext: 229765, scaleMin: 0.045, scaleMax: 4.556, colors: ["#53770dff","#18e29fff","#819ddbe6"] },
  { speed: 439.4, density: 3.437, jump: 16.0, moveSpeed: 24.8, scoreToNext: 286058, scaleMin: 0.044, scaleMax: 4.801, colors: ["#8bca0dff","#4e15eaff","#e60f07e6"] }, //48lvl
  { speed: 500.3, density: 3.901, jump: 16.2, moveSpeed: 24.9, scoreToNext: 357275, scaleMin: 0.043, scaleMax: 5.102, colors: ["#24de2dff","#1ba074ff","#3366d5e6"] },
  { speed: 573.6, density: 4.486, jump: 16.5, moveSpeed: 25.0, scoreToNext: 448753, scaleMin: 0.042, scaleMax: 5.436, colors: ["#eb6c12ff","#e918a7ff","#92b70ce6"] }, //50lvl
];

// === ELEMENTY UI ===
const ui = document.getElementById("ui");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const startBtn = document.getElementById("startBtn");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const finalLevel = document.getElementById("finalLevel");
const nicknameInput = document.getElementById("nicknameInput");
const nicknameField = document.getElementById("nickname");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const restartBtn = document.getElementById("restartBtn");
const controls = document.getElementById("controls");
const rankingBody = document.getElementById("rankingBody");
const globalRankingBody = document.getElementById("globalRankingBody");
const progressFill = document.getElementById("progressFill");
const resetRankingBtn = document.getElementById("resetRankingBtn");
const resetPass = document.getElementById("resetPass");

// Changelog elements (in-game changelog modal)
const changelogBtn = document.getElementById("changelogBtn");
const changelogModal = document.getElementById("changelogModal");
const changelogBody = document.getElementById("changelogBody");
const closeChangelog = document.getElementById("closeChangelog");

// Shop elements
const shopBtn = document.getElementById("shopBtn");
const shopModal = document.getElementById("shopModal");
const closeShop = document.getElementById("closeShop");
const coinCount = document.getElementById("coinCount");
const shopItems = document.getElementById("shopItems");
const abilityBtn = document.getElementById("abilityBtn");
const abilityCooldown = document.getElementById("abilityCooldown");

let player, obstacles, powerUps, coins, score, level, running, keys, ranking;
let scoreSaved = false;
let gameStartTime = Date.now();

// === SHOP & SKINS SYSTEM ===
let playerCoins = parseInt(localStorage.getItem("playerCoins")) || 0;
let ownedSkins = JSON.parse(localStorage.getItem("ownedSkins")) || [0]; // skin 0 jest darmowy
let equippedSkin = parseInt(localStorage.getItem("equippedSkin")) || 0;
let abilityCooldownTimer = 0;
let abilityReady = false;
let freezeAbilityCooldown = 0;
let freezeAbilityReady = false;

// Osiągnięcia
let achievements = JSON.parse(localStorage.getItem("achievements")) || {
  score100: false,
  score250: false,
  score500: false,
  score1000: false,
  time15: false,
  time30: false,
  time60: false,
  time90: false
};

// Koło fortuny
let lastSpinTime = parseInt(localStorage.getItem("lastSpinTime")) || 0;
let wheelSpinning = false;

const SKINS = [
  { id: 0, name: "Startowy skin", effect: "Zwykły wygląd", price: 0, 
    style: { type: "solid", value: "#01cbe1ff" },
    image: "<img src='niebo.png' style='width:100%; height:100%; object-fit:cover;'>" },
  { id: 1, name: "Złoty", effect: "Zmienia skin na złoty", price: 100, 
    style: { type: "solid", value: "#ffd700" },
    image: "<img src='zloto3.png' style='width:100%; height:100%; object-fit:cover;'>" },
  { id: 2, name: "Ratunek", effect: "+1 dodatkowe serce", price: 200, 
    style: { type: "solid", value: "#ff0080" },
    image: "<img src='serce.png' style='width:100%; height:100%; object-fit:cover;'>" },
  { id: 3, name: "Maluch", effect: "Zmniejsza wielkość postaci o 20%", price: 300, 
    style: { type: "solid", value: "#00ff88" },
    image: "<img src='maluch.png' style='width:100%; height:100%; object-fit:cover;'>" },
  { id: 4, name: "Powolny Czas", effect: "Zmniejsza prędkość gry o 10%", price: 450, 
    style: { type: "solid", value: "#8a2be2" },
    image: "<img src='zegar.png' style='width:100%; height:100%; object-fit:cover;'>" },
  { id: 5, name: "Mnożnik", effect: "Punkty × 1.2", price: 600, 
    style: { type: "solid", value: "#ff6600" },
    image: "<img src='matma.png' style='width:100%; height:100%; object-fit:cover;'>" },
  { id: 6, name: "Destroyer", effect: "Usuwa 2 przeszkody (co 15s) - Naciśnij ENTER", price: 750, 
    style: { type: "solid", value: "#ff0000" },
    image: "<img src='atom.png' style='width:100%; height:100%; object-fit:cover;'>" },
  { id: 7, name: "Skin VIP 2", effect: "Nic, ale dostajesz +999 aury", price: 1000, 
    style: { type: "solid", value: "#09069eff" },
    image: "<img src='niebo.png' style='width:100%; height:100%; object-fit:cover;'>" },
  { id: 8, name: "🤡 Spowolnienie", effect: "Spowalnia grę o 50% 😏", price: 10, 
    style: { type: "solid", value: "#ff1493" },
    image: "🤡" },
  { id: 9, name: "Zamrożenie", effect: "Zamraża grę na 0.7s (co 10s) - Naciśnij ENTER", price: 1500, 
    style: { type: "solid", value: "#00d5ff" },
    image: "❄️" },
  { id: 10, name: "Tank", effect: "+2 życia + Prędkość gry -5%", price: 2000, 
    style: { type: "solid", value: "#32cd32" },
    image: "🛡️" },
  { id: 11, name: "Tęczowy", effect: "Tylko wygląd - Z Koła Fortuny!", price: 0, hidden: true,
    style: { type: "gradient", value: "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)" },
    image: "🌈" }
];

// Formatowanie wyniku do wyświetlenia: jeśli >=500 pokazuj liczbę całkowitą,
// jeśli niemal całkowity też zaokrąglaj, w przeciwnym wypadku dwie cyfry.
function formatDisplayScore(val)
{
  if(typeof val !== 'number') return String(val);
  if(val >= 500) return String(Math.round(val));
  if (Math.abs(val - Math.round(val)) < 0.0005) return String(Math.round(val));
  return val.toFixed(2);
}

// === AUDIO ===
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type)
{
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const set = { jump:[600,0.15], level:[200,0.3], lose:[80,0.6], point:[600,0.1] };
  const [freq,dur]=set[type];
  osc.frequency.value=freq+Math.random()*30-15;
  osc.type="sine";
  gain.gain.setValueAtTime(0.2,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime+dur);
}

// === INICJALIZACJA GRY ===
function initGame()
{
  const skin = SKINS[equippedSkin];
  const sizeMultiplier = equippedSkin === 3 ? 0.8 : 1; // skin 3 zmniejsza o 20%
  
  player = {
    x: canvas.width/2-25,
    y: canvas.height-120,
    width: 50 * sizeMultiplier,
    height: 50 * sizeMultiplier,
    style: skin.style,
    dx: 0,
    dy: 0,
    jumping: false
  };

  player.shieldUntil = 0; // timestamp
  player.multiplierUntil = 0; // timestamp
  player.slowUntil = 0;
  player.slowFactor = 0.5; // 50% speed while active
  player.multiplierFactor = 1;
  player.multiplierLevel = 1; // bazowy poziom mnożnika (będzie się stackować)
  obstacles=[];
  powerUps = [];
  coins = [];
  score=0;
  level=1;
  running=true;
  keys={left:false,right:false,up:false};
  ui.style.display="block";
  controls.style.display="flex";
  gameOverScreen.style.display="none";
  nicknameInput.style.display="none";
  progressFill.style.width="0%";
  scoreSaved=false;
  gameStartTime = Date.now();
  
  // Reset ability cooldowns
  abilityCooldownTimer = 0;
  abilityReady = true;
  freezeAbilityCooldown = 0;
  freezeAbilityReady = true;
  
  // Setup ability buttons
  const destroyerBtn = document.getElementById("abilityBtn");
  const freezeBtn = document.getElementById("freezeAbilityBtn");
  
  if(equippedSkin === 6) {
    destroyerBtn.style.display = "flex";
    destroyerBtn.classList.remove("cooldown");
    document.getElementById("abilityCooldown").textContent = "✓";
  } else {
    destroyerBtn.style.display = "none";
  }
  
  if(equippedSkin === 9) {
    if(!freezeBtn) {
      const btn = document.createElement("button");
      btn.id = "freezeAbilityBtn";
      btn.className = "ability-btn freeze";
      btn.innerHTML = `
        <span class="ability-key-hint">ENTER</span>
        <span class="ability-icon">❄️</span>
        <span class="ability-cooldown" id="freezeCooldown">✓</span>
      `;
      document.body.appendChild(btn);
    } else {
      freezeBtn.style.display = "flex";
      freezeBtn.classList.remove("cooldown");
      document.getElementById("freezeCooldown").textContent = "✓";
    }
  } else {
    if(freezeBtn) freezeBtn.style.display = "none";
  }
  
  // Dodatkowe serca
  if(equippedSkin === 2) {
    heartsCount = 5;
  } else if(equippedSkin === 10) {
    heartsCount = 6; // Tank skin
  } else {
    heartsCount = 4;
  }
  
  // Add Enter key hint to destroyer button
  if(equippedSkin === 6) {
    const hint = destroyerBtn.querySelector(".ability-key-hint");
    if(!hint) {
      const hintEl = document.createElement("span");
      hintEl.className = "ability-key-hint";
      hintEl.textContent = "ENTER";
      destroyerBtn.insertBefore(hintEl, destroyerBtn.firstChild);
    }
  }
  
  document.body.classList.add("game-active");
}

// === START MENU EFFECTS ===
function startMenuEffects() 
{
  const snowCount = 44;
  for(let i = 0; i < snowCount; i++) {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.style.left = `${Math.random() * 100}vw`;
    snow.style.animationDuration = `${3 + Math.random() * 4}s`;
    snow.style.width = `${10 + Math.random() * 15}px`;
    snow.style.height = snow.style.width;
    document.body.appendChild(snow);
  }
}

const particleCount = 93;
const container = document.createElement('div');
container.id = 'particles';
document.body.appendChild(container);
const colors = ['#ff0000', '#00ff00', '#ffffff'];
for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.top = Math.random() * 80 + 'vh';
  p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  p.style.animationDuration = (3 + Math.random() * 5) + 's';
  p.style.opacity = Math.random() * 0.7 + 0.3;
  container.appendChild(p);
}

// usuwanie efektów po starcie gry
startBtn.addEventListener('click', () => {
  document.getElementById('menuBackground').style.display = 'none';
  document.querySelectorAll('.snowflake').forEach(s => s.remove());
  // Nie ukrywamy przycisku sklepu - jest na fixed position przy osiągnięciach
});

// wywołanie przy starcie
startMenuEffects();

// === STEROWANIE ===
document.addEventListener("keydown", e=>{
  if(["ArrowLeft","a","A"].includes(e.key)) keys.left=true;
  if(["ArrowRight","d","D"].includes(e.key)) keys.right=true;
  if(["ArrowUp","w","W"].includes(e.key)) keys.up=true;
  
  // Enter dla umiejętności
  if(e.key === "Enter" && running) {
    if(equippedSkin === 6) useDestroyerAbility();
    if(equippedSkin === 9) useFreezeAbility();
  }
});
document.addEventListener("keyup", e=>{
  if(["ArrowLeft","a","A"].includes(e.key)) keys.left=false;
  if(["ArrowRight","d","D"].includes(e.key)) keys.right=false;
  if(["ArrowUp","w","W"].includes(e.key)) keys.up=false;
});
["left","right","up"].forEach(id=>{
  const btn=document.getElementById(id);
  btn.addEventListener("mousedown",()=>keys[id]=true);
  btn.addEventListener("mouseup",()=>keys[id]=false);
  btn.addEventListener("touchstart",()=>keys[id]=true);
  btn.addEventListener("touchend",()=>keys[id]=false);
});

// === SKOK ===
function jump(conf)
{
  if(!player.jumping){
    player.dy=-conf.jump;
    player.jumping=true;
    playSound("jump");
  }
}

// === PRZESZKODY ===
function spawnObstacle()
{
  const conf=LEVEL_CONFIG[Math.min(level-1,LEVEL_CONFIG.length-1)];
  const scale=conf.scaleMin+Math.random()*(conf.scaleMax-conf.scaleMin);
  const baseWidth=40+Math.random()*40;
  const baseHeight=20+Math.random()*30;
  const width=baseWidth*scale;
  const height=baseHeight*scale;
  const speed=conf.speed*(0.8+Math.random()*0.4);
  const color=conf.colors[Math.floor(Math.random()*conf.colors.length)];
  obstacles.push({x:Math.random()*(canvas.width-width),y:-height,width,height,color,speed,counted:false});
}

// === POWER-UPS ===
function spawnPowerUp()
{
  const conf=LEVEL_CONFIG[Math.min(level-1,LEVEL_CONFIG.length-1)];
  if(Math.random() > 0.018) return; // niska szansa
  const types = ["shield","mult","slow"];
  const type = types[Math.floor(Math.random()*types.length)];
  const size = type==="shield"?48:44;
  const x = Math.random()*(canvas.width-size);
  const y = -size;
  const speed = conf.speed * 0.5 * (0.8+Math.random()*0.4);
  powerUps.push({x,y,size,type,speed});
}

// === COINS ===
function spawnCoin()
{
  // Stała szansa niezależna od poziomu
  const roll = Math.random();
  
  let type, size, speed, value, color;
  
  if(roll > 0.985) { // 1.5% - Mityczna (czerwona) +10
    type = "mythic";
    value = 10;
    size = 55;
    speed = 7;
    color = "#ff0000";
  } else if(roll > 0.96) { // 2.5% - Rzadka (fioletowa) +5
    type = "rare";
    value = 5;
    size = 48;
    speed = 6;
    color = "#9400d3";
  } else if(roll > 0.91) { // 5% - Niezwykła (niebieska) +2
    type = "uncommon";
    value = 2;
    size = 42;
    speed = 5;
    color = "#00bfff";
  } else if(roll > 0.88) { // 3% - Zwykła (złota) +1
    type = "common";
    value = 1;
    size = 38;
    speed = 4 + Math.random() * 2;
    color = "#ffd700";
  } else {
    return; // Nie spawn monety
  }
  
  const x = Math.random()*(canvas.width-size);
  const y = -size;
  coins.push({x, y, size, speed, value, color, type});
}

// === ANIMACJA "+1" ===
function showFloatingText(text,x,y)
{
  let alpha=1;
  const step=()=>{
    ctx.font="22px Arial";
    ctx.fillStyle=`rgba(255,255,255,${alpha})`;
    ctx.fillText(text,x,y);
    y-=1;
    alpha-=0.02;
    if(alpha>0) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// === FLASH SCREEN ===
function flashScreen(color)
{
  const overlay=document.createElement("div");
  overlay.style.position="absolute";
  overlay.style.top="0";
  overlay.style.left="0";
  overlay.style.width="100%";
  overlay.style.height="100%";
  overlay.style.backgroundColor=color;
  overlay.style.opacity="0.5";
  overlay.style.transition="opacity 0.5s ease-out";
  document.body.appendChild(overlay);
  setTimeout(()=>overlay.style.opacity="0",100);
  setTimeout(()=>overlay.remove(),600);
}

// === ZMIANA POZIOMU ===
function nextLevel()
{
  if(level >= LEVEL_CONFIG.length) return;
  level++;
  playSound("level");
  flashScreen("#00ff88");
}

// === USE ABILITY (SKIN #6) ===
function useDestroyerAbility()
{
  if(!abilityReady || abilityCooldownTimer > 0) return;
  
  // Znajdź 2 najbliższe przeszkody
  const sorted = obstacles
    .filter(o => o.y < player.y) // tylko te powyżej gracza
    .sort((a, b) => {
      const distA = Math.hypot(a.x - player.x, a.y - player.y);
      const distB = Math.hypot(b.x - player.x, b.y - player.y);
      return distA - distB;
    });
  
  // Usuń 2 najbliższe
  for(let i = 0; i < Math.min(2, sorted.length); i++) {
    const idx = obstacles.indexOf(sorted[i]);
    if(idx !== -1) {
      obstacles.splice(idx, 1);
      flashScreen("rgba(255,0,128,0.3)");
    }
  }
  
  // Uruchom cooldown
  abilityReady = false;
  abilityCooldownTimer = 15;
  const btn = document.getElementById("abilityBtn");
  btn.classList.add("cooldown");
  playSound("level");
  
  const interval = setInterval(() => {
    abilityCooldownTimer--;
    document.getElementById("abilityCooldown").textContent = abilityCooldownTimer;
    if(abilityCooldownTimer <= 0) {
      clearInterval(interval);
      abilityReady = true;
      btn.classList.remove("cooldown");
      document.getElementById("abilityCooldown").textContent = "✓";
    }
  }, 1000);
}

// === FREEZE ABILITY (SKIN #9) ===
let freezeStartTime = 0;
let freezeDuration = 0;

function useFreezeAbility()
{
  if(!freezeAbilityReady || freezeAbilityCooldown > 0) return;
  
  // Zamroź grę na 0.7s
  freezeStartTime = Date.now();
  freezeDuration = 700; // 0.7 sekundy
  flashScreen("rgba(0,213,255,0.4)");
  playSound("level");
  
  // Cooldown 10s
  freezeAbilityReady = false;
  freezeAbilityCooldown = 10;
  const btn = document.getElementById("freezeAbilityBtn");
  btn.classList.add("cooldown");
  
  const interval = setInterval(() => {
    freezeAbilityCooldown--;
    document.getElementById("freezeCooldown").textContent = freezeAbilityCooldown;
    if(freezeAbilityCooldown <= 0) {
      clearInterval(interval);
      freezeAbilityReady = true;
      btn.classList.remove("cooldown");
      document.getElementById("freezeCooldown").textContent = "✓";
    }
  }, 1000);
}

// === MECHANIKA SERC ===
let heartsCount = 4;
let heartCooldown = false; // nowy cooldown

function drawHearts() 
{
  const heartSize = 40;
  const spacing = 10;
  const totalWidth = heartsCount * heartSize + (heartsCount - 1) * spacing;
  let startX = canvas.width/2 - totalWidth/2;
  let y = 20;
  for(let i = 0; i < heartsCount; i++){
    ctx.fillStyle = "#ff0000ff";
    ctx.beginPath();
    ctx.moveTo(startX + i*(heartSize+spacing) + heartSize/2, y + heartSize/4);
    ctx.bezierCurveTo(
      startX + i*(heartSize+spacing), y,
      startX + i*(heartSize+spacing), y + heartSize/2,
      startX + i*(heartSize+spacing) + heartSize/2, y + heartSize
    );
    ctx.bezierCurveTo(
      startX + i*(heartSize+spacing) + heartSize, y + heartSize/2,
      startX + i*(heartSize+spacing) + heartSize, y,
      startX + i*(heartSize+spacing) + heartSize/2, y + heartSize/4
    );
    ctx.fill();
  }
}

// === GŁÓWNA PĘTLA GRY ===
function gameLoop()
{
  if(!running){ requestAnimationFrame(gameLoop); return; }
  const conf=LEVEL_CONFIG[Math.min(level-1,LEVEL_CONFIG.length-1)];
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // draw shield overlay when active (blue tint for duration)
  if(player && player.shieldUntil > Date.now())
  {
    ctx.fillStyle = "rgba(0, 148, 254, 0.28)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }

  // --- Time-based multiplier and timer display ---
  const elapsedMs = Date.now() - gameStartTime;
  const elapsedSec = elapsedMs / 1000;
  // compute time-based multiplier using log base 10: (log10(time))^0.1
  // if log10 <= 0 or result < 1 => default to 1.000
  const timeForFormula = Math.max(elapsedSec, 0.0001);
  const log10val = Math.log10(timeForFormula);
  let timeMultiplier;
  if (log10val <= 0) {
    timeMultiplier = 1;
  } else {
    timeMultiplier = Math.pow(log10val, 0.1);
    if (timeMultiplier < 1) timeMultiplier = 1;
  }
  // Dodatkowo mnożnik rośnie z poziomem: 1.035^(level-1)
  const levelMultiplier = Math.pow(1.035, level - 1);
  timeMultiplier *= levelMultiplier;
  
  // Skin 5 bonus: punkty x1.2
  const skinMultiplier = (equippedSkin === 5) ? 1.2 : 1;
  
  // draw timer + multiplier in top-right (WIĘKSZE NAPISY)
  const pad = 18;
  const boxW = 190;
  const boxH = 140;
  ctx.save();
  ctx.textAlign = "left";
  ctx.font = "24px Arial";
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(canvas.width - boxW - pad, pad, boxW, boxH);
  ctx.fillStyle = "#ffffff";
  const textX = canvas.width - boxW - pad + 12;
  ctx.fillText(elapsedSec.toFixed(2) + " s", textX, pad + 30);
  ctx.font = "20px Arial";
  ctx.fillText("mult: " + timeMultiplier.toFixed(3) + "x", textX, pad + 58);
  
  // Aktywny mnożnik power-upu
  if(player && player.multiplierUntil > Date.now()){
    ctx.font = "18px Arial";
    ctx.fillStyle = "#ffaa00";
    ctx.fillText("bonus: x" + player.multiplierFactor.toFixed(2), textX, pad + 82);
    ctx.fillStyle = "#ffffff";
  }
  
  // shield remaining time
  if(player && player.shieldUntil > Date.now()){
    const rem = Math.max(0, (player.shieldUntil - Date.now())/1000);
    ctx.font = "16px Arial";
    ctx.fillText("shield: " + rem.toFixed(1) + " s", textX, pad + 104);
  }
  // slow remaining time
  if(player && player.slowUntil > Date.now()){
    const remSlow = Math.max(0, (player.slowUntil - Date.now())/1000);
    ctx.font = "16px Arial";
    const slowY = (player.shieldUntil > Date.now()) ? pad + 124 : pad + 104;
    ctx.fillText("slow: " + remSlow.toFixed(1) + " s", textX, slowY);
  }
  ctx.restore();

  // Check if game is frozen
  const isFrozen = (Date.now() - freezeStartTime) < freezeDuration;
  
  // current slow multiplier (applies to movement while active)
  let currentSpeedMultiplier = isFrozen ? 0 : (player.slowUntil > Date.now()) ? player.slowFactor : 1;
  
  // Skin modifiers
  if(equippedSkin === 4) currentSpeedMultiplier *= 0.9; // -10%
  if(equippedSkin === 8) currentSpeedMultiplier *= 2.0; // Troll: +100% (nie -50%!)
  if(equippedSkin === 10) currentSpeedMultiplier *= 0.95; // -5%

  // Rysowanie gracza z obsługą gradientów i obrazków
  if(player.style.type === "solid") {
    ctx.fillStyle = player.style.value;
    ctx.fillRect(player.x, player.y, player.width, player.height);
  } else if(player.style.type === "gradient") {
    const gradient = ctx.createLinearGradient(player.x, player.y, player.x + player.width, player.y + player.height);
    // Parse gradient string (simplified)
    const colors = player.style.value.match(/#[0-9a-f]{6}/gi) || [];
    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  // Sterowanie
  if(keys.left) player.x-=conf.moveSpeed;
  if(keys.right) player.x+=conf.moveSpeed;
  if(keys.up) jump(conf);

  // Grawitacja
  player.y+=player.dy;
  player.dy+=0.9;
  if(player.y+player.height>=canvas.height-50){
    player.y=canvas.height-50-player.height;
    player.dy=0;
    player.jumping=false;
  }
  player.x=Math.max(0,Math.min(player.x,canvas.width-player.width));

  // Generowanie przeszkód
  if(Math.random()<conf.density) spawnObstacle();
  // generowanie power-upów (rzadko)
  spawnPowerUp();
  // generowanie monet
  spawnCoin();

  // rysowanie i kolizje power-upów
  for(let pi=powerUps.length-1; pi>=0; pi--){
    const p = powerUps[pi];
    p.y += p.speed * currentSpeedMultiplier;
    // rysuj
    ctx.beginPath();
    if(p.type==="shield") ctx.fillStyle = "#00ffd9ff";
    else if(p.type==="mult") ctx.fillStyle = "#fbb000ff";
    else ctx.fillStyle = "#00e6ffff"; // slow power-up color
    ctx.arc(p.x + p.size/2, p.y + p.size/2, p.size/2, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    // label (bigger)
    ctx.fillStyle = "#000000ff";
    ctx.font = "16px Arial";
    const label = p.type==="shield"?"S":(p.type==="mult"?"x1.5":"Slow");
    ctx.fillText(label, p.x + Math.max(6, p.size*0.1), p.y + p.size/2 + 6);

    // kolizja z graczem
    if(player.x < p.x + p.size && player.x + player.width > p.x &&
       player.y < p.y + p.size && player.y + player.height > p.y){
      if(p.type==="shield")
      {
        // extend existing shield by 2s (stacking)
        const now = Date.now();
        player.shieldUntil = Math.max(player.shieldUntil, now) + 2000; // add 2000ms
        flashScreen("rgba(0,255,255,0.25)");
      } 
      else if(p.type==="mult")
      {
        // Każdy kolejny mnożnik x1.5 mnoży efekt i dodaje +1s
        const now = Date.now();
        if(player.multiplierUntil > now) {
          // Już jest aktywny - stackujemy
          player.multiplierFactor *= 1.5; // mnożymy istniejący
          player.multiplierUntil += 1000; // dodajemy +1s
        } else {
          // Nowy power-up
          player.multiplierFactor = 1.5;
          player.multiplierUntil = now + 2000; // bazowo 2s
        }
      } 
      else if(p.type==="slow")
      {
        // Każdy kolejny slow dodaje +1s czasu trwania
        const now = Date.now();
        player.slowFactor = 0.5; // 50% speed (zawsze ten sam)
        if(player.slowUntil > now) {
          // Już jest aktywny - dodajemy +1s
          player.slowUntil += 1000;
        } else {
          // Nowy power-up
          player.slowUntil = now + 1500; // bazowo 1.5s
        }
        flashScreen("rgba(0,0,255,0.18)");
      }
      playSound("level");
      showFloatingText(p.type==="shield"?"Shield":"x1.5", player.x+10, player.y-10);
      powerUps.splice(pi,1);
    }

    // usuń jeśli poza ekranem
    if(p.y > canvas.height + 100) powerUps.splice(pi,1);
  }

  for(let i=obstacles.length-1;i>=0;i--)
    {
    const o=obstacles[i];
    o.y += o.speed * currentSpeedMultiplier;
    ctx.fillStyle=o.color;
    ctx.fillRect(o.x,o.y,o.width,o.height);

    // Kolizja z przeszkodą (uwzględnia tarczę)
    if(player.x<o.x+o.width && player.x+player.width>o.x &&
       player.y<o.y+o.height && player.y+player.height>o.y){
      if(player.shieldUntil > Date.now()){
        // shield active: ignore damage while shield lasts
        playSound("point");
      } else {
        if(!heartCooldown){
          playSound("lose");
          heartsCount--;
          heartCooldown = true;
          setTimeout(()=>heartCooldown=false, 650);
          if(heartsCount <= 0){
            return endGame();
          }
        }
      }
    }

    // Punktacja SCORE TUTAJ mechanizm zaliczania punktów
    if(o.y>canvas.height && !o.counted){
      const powerMult = (player.multiplierUntil > Date.now()) ? player.multiplierFactor : 1;
      const finalMult = powerMult * timeMultiplier * skinMultiplier;
      const gained = 1 * finalMult;
      score += gained;
      o.counted=true;
      playSound("point");
      showFloatingText("+" + gained.toFixed(2),player.x+20,player.y-10);
    }

    // Usuwanie
    if(o.y>canvas.height+100) obstacles.splice(i,1);
  }
  
  // === MONETY ===
  for(let ci=coins.length-1; ci>=0; ci--){
    const c = coins[ci];
    
    if(!isFrozen) {
      c.y += c.speed;
    }
    
    // rysuj monetę
    ctx.save();
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(c.x + c.size/2, c.y + c.size/2, c.size/2, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    
    // Shimmer effect dla rzadszych monet
    if(c.type !== "common") {
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Symbol monety i wartość
    ctx.fillStyle = "#000";
    const fontSize = Math.floor(c.size * 0.5);
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("💰", c.x + c.size/2, c.y + c.size/2 + fontSize/3);
    
    // Wartość dla specjalnych monet
    if(c.value > 1) {
      ctx.font = `bold ${Math.floor(fontSize * 0.6)}px Arial`;
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeText(`+${c.value}`, c.x + c.size/2, c.y + c.size - 8);
      ctx.fillText(`+${c.value}`, c.x + c.size/2, c.y + c.size - 8);
    }
    ctx.restore();
    
    // kolizja z graczem
    if(player.x < c.x + c.size && player.x + player.width > c.x &&
       player.y < c.y + c.size && player.y + player.height > c.y){
      playerCoins += c.value;
      localStorage.setItem("playerCoins", playerCoins);
      playSound("point");
      showFloatingText(`+${c.value}💰`, player.x+15, player.y-15);
      coins.splice(ci, 1);
    }
    
    // usuń jeśli poza ekranem
    if(c.y > canvas.height + 100) coins.splice(ci, 1);
  }

  drawHearts();

  // Pasek postępu
  progressFill.style.width=Math.min(100,(score/conf.scoreToNext)*100)+"%";

  // Zmiana poziomu
  if(score>=conf.scoreToNext) nextLevel();

  scoreDisplay.textContent=score.toFixed(2);
  levelDisplay.textContent=level;
  
  // Sprawdzanie osiągnięć
  checkAchievements();

  requestAnimationFrame(gameLoop);
}

// === ACHIEVEMENTS ===
function checkAchievements()
{
  const elapsed = (Date.now() - gameStartTime) / 1000;
  let updated = false;
  
  if(score >= 100 && !achievements.score100) {
    achievements.score100 = true;
    updated = true;
    showFloatingText("🏅 Osiągnięcie: 100 punktów!", canvas.width/2 - 100, canvas.height/2);
  }
  if(score >= 250 && !achievements.score250) {
    achievements.score250 = true;
    updated = true;
    showFloatingText("🏅 Osiągnięcie: 250 punktów!", canvas.width/2 - 100, canvas.height/2);
  }
  if(score >= 500 && !achievements.score500) {
    achievements.score500 = true;
    updated = true;
    showFloatingText("🏅 Osiągnięcie: 500 punktów!", canvas.width/2 - 100, canvas.height/2);
  }
  if(score >= 1000 && !achievements.score1000) {
    achievements.score1000 = true;
    updated = true;
    showFloatingText("🏅 Osiągnięcie: 1000 punktów!", canvas.width/2 - 100, canvas.height/2);
  }
  if(elapsed >= 15 && !achievements.time15) {
    achievements.time15 = true;
    updated = true;
    showFloatingText("🏅 Osiągnięcie: 15s przetrwania!", canvas.width/2 - 100, canvas.height/2);
  }
  if(elapsed >= 30 && !achievements.time30) {
    achievements.time30 = true;
    updated = true;
    showFloatingText("🏅 Osiągnięcie: 30s przetrwania!", canvas.width/2 - 100, canvas.height/2);
  }
  if(elapsed >= 60 && !achievements.time60) {
    achievements.time60 = true;
    updated = true;
    showFloatingText("🏅 Osiągnięcie: 60s przetrwania!", canvas.width/2 - 100, canvas.height/2);
  }
  if(elapsed >= 90 && !achievements.time90) {
    achievements.time90 = true;
    updated = true;
    showFloatingText("🏅 Osiągnięcie: 90s przetrwania!", canvas.width/2 - 100, canvas.height/2);
  }
  
  if(updated) {
    localStorage.setItem("achievements", JSON.stringify(achievements));
    renderAchievements();
  }
}

function renderAchievements()
{
  const list = document.getElementById("achievementsList");
  if(!list) return;
  
  const achList = [
    { key: "score100", name: "100 punktów", progress: Math.min(score, 100) + "/100" },
    { key: "score250", name: "250 punktów", progress: Math.min(score, 250) + "/250" },
    { key: "score500", name: "500 punktów", progress: Math.min(score, 500) + "/500" },
    { key: "score1000", name: "1000 punktów", progress: Math.min(score, 1000) + "/1000" },
    { key: "time15", name: "Przetrwaj 15s", progress: running ? Math.floor((Date.now() - gameStartTime)/1000) + "/15s" : "0/15s" },
    { key: "time30", name: "Przetrwaj 30s", progress: running ? Math.floor((Date.now() - gameStartTime)/1000) + "/30s" : "0/30s" },
    { key: "time60", name: "Przetrwaj 60s", progress: running ? Math.floor((Date.now() - gameStartTime)/1000) + "/60s" : "0/60s" },
    { key: "time90", name: "Przetrwaj 90s", progress: running ? Math.floor((Date.now() - gameStartTime)/1000) + "/90s" : "0/90s" }
  ];
  
  list.innerHTML = achList.map(a => `
    <div class="achievement-item ${achievements[a.key] ? 'completed' : ''}">
      <div class="achievement-name">${achievements[a.key] ? '✓ ' : ''}${a.name}</div>
      <div class="achievement-progress">${a.progress}</div>
    </div>
  `).join("");
}

// === KONIEC GRY ===
function endGame()
{
  running=false;
  document.body.classList.remove("game-active");
  ui.style.display="none";
  controls.style.display="none";
  gameOverScreen.style.display="flex";
  
  const destroyerBtn = document.getElementById("abilityBtn");
  const freezeBtn = document.getElementById("freezeAbilityBtn");
  if(destroyerBtn) destroyerBtn.style.display="none";
  if(freezeBtn) freezeBtn.style.display="none";
  
  const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
  finalScore.textContent = formatDisplayScore(score);
  finalLevel.textContent = level;
  document.getElementById("finalTime").textContent = elapsedTime;
  flashScreen("#ef0505ff");

  ranking = JSON.parse(localStorage.getItem("ranking")||"[]");
  ranking.push({ name: "Temp", score, level, time: elapsedTime });
  ranking.sort((a, b) => b.score - a.score);
  const isTop = ranking.findIndex(r => r.score === score && r.name === "Temp") < 10;
  ranking = ranking.filter(r => r.name !== "Temp");
  
  nicknameInput.style.display = isTop ? "flex" : "none";

  updateLocalRanking();
  loadGlobalRanking();

  // Przycisk powrotu do menu
  let menuBtn = document.getElementById("backToMenu");
  if(!menuBtn){
    menuBtn = document.createElement("button");
    menuBtn.id = "backToMenu";
    menuBtn.textContent = "♿️Powrót do menu♿️";
    menuBtn.style.marginTop = "10px";
    menuBtn.onclick = backToMenu;
    gameOverScreen.appendChild(menuBtn);
  }
}

// === POWRÓT DO MENU ===
function backToMenu()
{
  running = false;
  document.body.classList.remove("game-active");
  player = null;
  obstacles = [];
  coins = [];
  keys = {left:false,right:false,up:false};
  score = 0;
  level = 1;
  heartsCount = 4;
  progressFill.style.width = "0%";

  ui.style.display = "none";
  controls.style.display = "none";
  gameOverScreen.style.display = "none";
  nicknameInput.style.display = "none";
  
  const destroyerBtn = document.getElementById("abilityBtn");
  const freezeBtn = document.getElementById("freezeAbilityBtn");
  if(destroyerBtn) destroyerBtn.style.display = "none";
  if(freezeBtn) freezeBtn.style.display = "none";
  
  // Przycisk sklepu jest fixed position - zawsze widoczny
  document.getElementById("menuBackground").style.display = "block";
  document.getElementById("menu").style.display = "block";
  document.getElementById("achievementsPanel").style.display = "block";
  document.getElementById("wheelPanel").style.display = "block";

  const menuBtn = document.getElementById("backToMenu");
  if(menuBtn) menuBtn.remove();
  
  renderAchievements();
}

// === RANKINGI ===

// Bezpieczna funkcja aktualizacji – zapisuje TYLKO jeśli mamy dane
function updateLocalRanking() 
{
  if (!Array.isArray(ranking) || ranking.length === 0) {
    rankingBody.innerHTML = "<tr><td colspan='4'>Brak wyników</td></tr>";
    return;
  }

  ranking.sort((a, b) => b.score - a.score);
  ranking = ranking.slice(0, 10);
  localStorage.setItem("ranking", JSON.stringify(ranking));

  rankingBody.innerHTML = ranking.map((r, i) => {
    let color = "";
    if (i === 0) color = "style='color:gold;font-weight:bold'";
    else if (i === 1) color = "style='color:silver;font-weight:bold'";
    else if (i === 2) color = "style='color:#cd7f32;font-weight:bold'";
    else color = "style='color:#cfcfcf'";
    const time = r.time ? r.time + "s" : "-";
    return `<tr ${color}><td>${i + 1}. ${r.name}</td><td>${formatDisplayScore(r.score)}</td><td>${r.level}</td><td>${time}</td></tr>`;
  }).join("");
}

// === GLOBALNY RANKING Z CLOUDFLARE ===
function loadGlobalRanking() 
{
  // Spróbuj załadować z Cloudflare Workers
  fetch("https://YOUR_WORKER.workers.dev/api/scores")
    .then(res => res.json())
    .then(data => {
      if(data.scores) {
        data.scores.sort((a, b) => b.score - a.score);
        const top10 = data.scores.slice(0, 10);
        globalRankingBody.innerHTML = top10
          .map(r => {
            const date = new Date(r.date).toLocaleDateString('pl-PL');
            return `<tr><td>${r.nick}</td><td>${formatDisplayScore(r.score)}</td><td>${r.level}</td><td>${r.time}s</td><td>${date}</td></tr>`;
          })
          .join("");
      }
    })
    .catch(err => {
      // Fallback do lokalnego pliku jeśli backend offline
      fetch("global.json")
        .then(res => res.json())
        .then(data => {
          data.sort((a, b) => b.score - a.score);
          const top10 = data.slice(0, 10);
          globalRankingBody.innerHTML = top10
            .map(r => `<tr><td>${r.nick}</td><td>${formatDisplayScore(r.score)}</td><td>${r.level}</td><td>${r.time}s</td><td>${r.date}</td></tr>`)
            .join("");
        })
        .catch(err => {
          globalRankingBody.innerHTML = "<tr><td colspan='5'>Brak połączenia</td></tr>";
        });
    });
}

// === ZAPIS WYNIKU ===
saveScoreBtn.onclick = () => 
  {
  if (scoreSaved) return;

  const nick = nicknameField.value.trim() || "Gracz";
  const deviceId = localStorage.getItem("deviceId") || Math.random().toString(36).substr(2, 9);
  localStorage.setItem("deviceId", deviceId);

  const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
  
  // dodajemy wynik
  ranking.push({ name: nick, score, level, time: elapsedTime });

  // tutaj BEZPIECZNIE aktualizujemy ranking (bo coś się zmieniło)
  updateLocalRanking();
  scoreSaved = true;

  // wysyłka globalna do Cloudflare Workers
  const payload = {
    nick,
    score,
    level,
    time: elapsedTime,
    date: new Date().toISOString(),
    deviceId
  };

  // Spróbuj wysłać do Cloudflare Workers (jeśli jest dostępny)
  fetch("https://YOUR_WORKER.workers.dev/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => { 
      if (data.success) {
        loadGlobalRanking();
        // Sprawdź czy jest w top 10
        if(data.isTop10) {
          showTop10Notification();
        }
      }
    })
    .catch(err => {
      console.log("Backend offline - wynik zapisany lokalnie");
      // Fallback - działa offline
    });

  nicknameInput.style.display = "none";
};

// === TOP 10 NOTIFICATION ===
function showTop10Notification()
{
  const notif = document.getElementById("top10Notification");
  notif.classList.add("show");
  setTimeout(() => {
    notif.classList.remove("show");
  }, 3000);
}

// === RESTART ===
restartBtn.onclick = () => 
{
  running = false;
  player = null;
  obstacles = [];
  coins = [];
  keys = { left: false, right: false, up: false };
  score = 0;
  level = 1;
  ui.style.display = "none";
  controls.style.display = "none";
  gameOverScreen.style.display = "none";
  initGame();
  gameLoop();
};

// === START GRY ===
startBtn.onclick = () => 
{
  running = false;
  player = null;
  obstacles = [];
  coins = [];
  keys = { left: false, right: false, up: false };
  score = 0;
  level = 1;
  ui.style.display = "none";
  controls.style.display = "none";
  gameOverScreen.style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("achievementsPanel").style.display = "none";
  document.getElementById("wheelPanel").style.display = "none";
  // Nie ukrywamy przycisku sklepu - jest fixed position
  document.getElementById("menuBackground").style.display = "none";
  initGame();
  gameLoop();
  loadGlobalRanking();
};

// === RESET RANKINGU ===
resetRankingBtn.onclick = () => 
{
  if (resetPass.value === "mistrz") {
    localStorage.removeItem("ranking");
    ranking = [];
    updateLocalRanking();
    alert("Ranking rozwalony!");
  } else alert("Jesteś głupi czy co?");
};

// === STARTOWE WCZYTANIE — bez zapisywania pustych danych ===
ranking = JSON.parse(localStorage.getItem("ranking") || "[]");

// tylko jeśli mamy jakieś wyniki, to wyświetl
if (ranking.length > 0) updateLocalRanking();
else rankingBody.innerHTML = "<tr><td colspan='3'>Zagraj aby otrzymać wynik</td></tr>";

// --- In-game changelog data and UI ---
const CHANGELOG = 
[
  { date: '25-12-2025', version: 'v1.4', notes: ['OSIĄGNIĘCIA! 8 osiągnięć do zdobycia','KOŁO FORTUNY! Kręć co 5 minut','11 SKINÓW! Troll skin, Freeze, Tank, Tęczowy!','Różne typy monet: zwykłe, niezwykłe, rzadkie, mityczne','Umiejętności na ENTER','Backend Cloudflare Workers','Notyfikacja TOP 10','Gradienty dla gracza','Czas w rankingach','Większe monety = więcej wartości'] },
  { date: '25-12-2025', version: 'v1.3', notes: ['SKLEP SKINÓW - 7 unikalnych skinów z efektami!','System monet - zbieraj monety podczas gry','Power-upy stackują się (x1.5 mnoży efekt, slow +1s)','Mnożnik czasowy rośnie z poziomem (x1.035)','Większe napisy w timerze + wyświetlanie aktywnego bonusu','Skin #6: Przycisk usuwania 2 przeszkód co 15s','Efekty skinów: dodatkowe życie, zmniejszenie rozmiaru, zwolnienie gry, bonus punktów'] },
  { date: '21-12-2025', version: 'v1.2', notes: ['4 życia zamiast 3 - lepsza wygoda i elastyczność','Dodano 50 poziomów power-upy: tarcza, mnożnik, slow.','Timer i mnożnik oparty o log10(time)^0.1 (min 1.000).','Tarcza stackuje się i nie jest konsumowana przy kolizji.','Formatowanie wyniku i rankingów.','Drobne poprawki UI (timer, overlayy, rozmiary).', 'zmieniono UI i UX ogromne zmiany we wszystkim ', 'nowy changelog , mechanika punktów i skalowanie stylu 1.29'] },
  { date: '09-12-2025', version: 'v1.1', notes: ['Dodano 3 serca', '30 poziomów zmiana UI UX', 'zmiany balansu i wyglądu tła oraz wnętrza' , 'świąteczny klimat' , 'światełka płateczki i wiele więcej'] },
  { date: '21-11-2025', version: 'v1.0.1', notes: ['Dodano 20 poziomów zmiana UI UX', 'zmiany balansu', 'dodano napisy przyszłosci'] },
  { date: '09-11-2025', version: 'v1.0', notes: ['Pierwotna wersja 1.0' , 'nasionko gry 15 poziomów 1 życie', 'link: https://mistrzunio.edgeone.app '] }
];

function showChangelog()
{
  if(!changelogModal || !changelogBody) return;
  // render notes as plain lines (no bullet points)
  changelogBody.innerHTML = CHANGELOG.map(c => {
    return `<div class="ch-entry"><strong>${c.version} — ${c.date}</strong><div class="ch-notes">` + c.notes.map(n=>`<div class="ch-note">${n}</div>`).join('') + `</div></div>`;
  }).join('');
  changelogModal.style.display = 'flex';
}

function hideChangelog()
{
  if(!changelogModal) return;
  changelogModal.style.display = 'none';
}

if(changelogBtn) changelogBtn.addEventListener('click', showChangelog);
if(closeChangelog) closeChangelog.addEventListener('click', hideChangelog);
window.addEventListener('click', (e)=>{ if(e.target === changelogModal) hideChangelog(); });

// populate top-of-menu changelog summary (latest entry)
function populateTopChangelog()
{
  const top = document.getElementById('changelogTop');
  if(!top || !Array.isArray(CHANGELOG) || CHANGELOG.length===0) return;
  const c = CHANGELOG[0];
  // join notes into plain inline text separated by em-dash
  const joined = c.notes.join(' — ');
  top.innerHTML = `<strong>${c.version} — ${c.date}</strong><div class="ch-notes-inline">${joined}</div>`;
}

populateTopChangelog();
loadGlobalRanking();

// === SHOP SYSTEM ===
function renderShop()
{
  coinCount.textContent = playerCoins;
  shopItems.innerHTML = "";
  
  SKINS.forEach(skin => {
    // Ukryj tęczowy skin jeśli nie został wylosowany
    if(skin.hidden && !ownedSkins.includes(skin.id)) return;
    
    const isOwned = ownedSkins.includes(skin.id);
    const isEquipped = equippedSkin === skin.id;
    
    const item = document.createElement("div");
    item.className = "shop-item" + (isEquipped ? " equipped" : isOwned ? " owned" : "");
    
    // Status badge
    let statusBadge = "";
    if(isEquipped) {
      statusBadge = '<div class="shop-item-status equipped">ZAŁOŻONY</div>';
    } else if(isOwned) {
      statusBadge = '<div class="shop-item-status owned">POSIADANY</div>';
    }
    
    // Button
    let button = "";
    if(skin.id === 0) {
      button = `<button class="shop-item-btn equipped">Domyślny</button>`;
    } else if(isEquipped) {
      button = `<button class="shop-item-btn equipped">Założony</button>`;
    } else if(isOwned) {
      button = `<button class="shop-item-btn equip" onclick="equipSkin(${skin.id})">Załóż</button>`;
    } else {
      const canBuy = playerCoins >= skin.price;
      button = `<button class="shop-item-btn buy" onclick="buySkin(${skin.id})" ${!canBuy ? 'disabled' : ''}>Kup (${skin.price} 💰)</button>`;
    }
    
    // Gradient preview dla shop-item-image
    let imageStyle = "";
    if(typeof skin.image === "string" && skin.image.length < 5) {
      // Emoji
      imageStyle = `style="font-size: 4rem; display: flex; align-items: center; justify-content: center;"`;
    }
    
    item.innerHTML = `
      ${statusBadge}
      <div class="shop-item-image" ${imageStyle}>${skin.image}</div>
      <div class="shop-item-name">${skin.name}</div>
      <div class="shop-item-effect">Efekt: ${skin.effect}</div>
      ${isOwned || skin.id === 0 || skin.hidden ? '' : `<div class="shop-item-price">${skin.price} 💰</div>`}
      ${button}
    `;
    
    shopItems.appendChild(item);
  });
}

function buySkin(skinId)
{
  const skin = SKINS[skinId];
  if(playerCoins >= skin.price && !ownedSkins.includes(skinId)) {
    playerCoins -= skin.price;
    ownedSkins.push(skinId);
    localStorage.setItem("playerCoins", playerCoins);
    localStorage.setItem("ownedSkins", JSON.stringify(ownedSkins));
    playSound("level");
    renderShop();
  }
}

function equipSkin(skinId)
{
  if(ownedSkins.includes(skinId)) {
    equippedSkin = skinId;
    localStorage.setItem("equippedSkin", equippedSkin);
    playSound("point");
    renderShop();
  }
}

// Shop button handlers
shopBtn.addEventListener("click", () => {
  renderShop();
  shopModal.style.display = "flex";
});

closeShop.addEventListener("click", () => {
  shopModal.style.display = "none";
});

// Close button at top of shop
const closeShopTop = document.getElementById("closeShopTop");
if(closeShopTop) {
  closeShopTop.addEventListener("click", () => {
    shopModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if(e.target === shopModal) {
    shopModal.style.display = "none";
  }
});

// Ability button handlers
document.getElementById("abilityBtn").addEventListener("click", useDestroyerAbility);

// === KOŁO FORTUNY ===
const wheelCanvas = document.getElementById("wheelCanvas");
const wheelCtx = wheelCanvas ? wheelCanvas.getContext("2d") : null;
const spinBtn = document.getElementById("spinBtn");

// Responsive wheel size
if(wheelCanvas) {
  const resizeWheel = () => {
    const panel = document.getElementById("wheelPanel");
    if(!panel) return;
    const panelWidth = panel.offsetWidth;
    const size = Math.min(280, panelWidth - 60);
    wheelCanvas.width = size;
    wheelCanvas.height = size;
    if(wheelCtx) drawWheel();
  };
  window.addEventListener('resize', resizeWheel);
  setTimeout(resizeWheel, 100);
}

const WHEEL_PRIZES = [
  { name: "50 monet", color: "#ffd700", value: 50, type: "coins" },
  { name: "20 monet", color: "#c0c0c0", value: 20, type: "coins" },
  { name: "100 monet", color: "#ff8c00", value: 100, type: "coins" },
  { name: "Nic", color: "#808080", value: 0, type: "nothing" },
  { name: "Tęczowy Skin", color: "rainbow", value: 11, type: "skin" }
];

let wheelRotation = 0;

function drawWheel() {
  if(!wheelCtx) return;
  
  const centerX = wheelCanvas.width / 2;
  const centerY = wheelCanvas.height / 2;
  const radius = wheelCanvas.width / 2 - 10;
  const sliceAngle = (Math.PI * 2) / WHEEL_PRIZES.length;
  
  wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  
  WHEEL_PRIZES.forEach((prize, i) => {
    const startAngle = wheelRotation + i * sliceAngle;
    const endAngle = startAngle + sliceAngle;
    
    wheelCtx.beginPath();
    wheelCtx.moveTo(centerX, centerY);
    wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
    wheelCtx.closePath();
    
    if(prize.color === "rainbow") {
      const gradient = wheelCtx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      gradient.addColorStop(0, "#ff0000");
      gradient.addColorStop(0.2, "#ffff00");
      gradient.addColorStop(0.4, "#00ff00");
      gradient.addColorStop(0.6, "#00ffff");
      gradient.addColorStop(0.8, "#0000ff");
      gradient.addColorStop(1, "#ff00ff");
      wheelCtx.fillStyle = gradient;
    } else {
      wheelCtx.fillStyle = prize.color;
    }
    wheelCtx.fill();
    wheelCtx.stroke();
    
    // Text
    wheelCtx.save();
    wheelCtx.translate(centerX, centerY);
    wheelCtx.rotate(startAngle + sliceAngle / 2);
    wheelCtx.textAlign = "center";
    wheelCtx.fillStyle = "#000";
    wheelCtx.font = "bold 12px Arial";
    wheelCtx.fillText(prize.name, radius / 2, 5);
    wheelCtx.restore();
  });
  
  // Pointer
  wheelCtx.beginPath();
  wheelCtx.moveTo(centerX, 10);
  wheelCtx.lineTo(centerX - 10, 30);
  wheelCtx.lineTo(centerX + 10, 30);
  wheelCtx.closePath();
  wheelCtx.fillStyle = "#ff0000";
  wheelCtx.fill();
}

function spinWheel() {
  if(wheelSpinning) return;
  
  const now = Date.now();
  const cooldownRemaining = 300000 - (now - lastSpinTime); // 5 minut = 300000ms
  
  if(cooldownRemaining > 0) {
    const minutes = Math.floor(cooldownRemaining / 60000);
    const seconds = Math.floor((cooldownRemaining % 60000) / 1000);
    document.getElementById("wheelCooldown").textContent = `Poczekaj: ${minutes}m ${seconds}s`;
    return;
  }
  
  wheelSpinning = true;
  spinBtn.disabled = true;
  
  const spinDuration = 5000;
  const spinRotations = 5 + Math.random() * 3; // 5-8 obrotów
  const finalRotation = (Math.PI * 2 * spinRotations) + (Math.random() * Math.PI * 2);
  const startTime = Date.now();
  const startRotation = wheelRotation;
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    wheelRotation = startRotation + finalRotation * easeOut;
    drawWheel();
    
    if(progress < 1) {
      requestAnimationFrame(animate);
    } else {
      wheelSpinning = false;
      spinBtn.disabled = false;
      lastSpinTime = Date.now();
      localStorage.setItem("lastSpinTime", lastSpinTime);
      
      // Determine prize
      const normalizedRotation = wheelRotation % (Math.PI * 2);
      const sliceAngle = (Math.PI * 2) / WHEEL_PRIZES.length;
      const pointerAngle = (Math.PI * 2) - normalizedRotation;
      const prizeIndex = Math.floor(pointerAngle / sliceAngle) % WHEEL_PRIZES.length;
      const prize = WHEEL_PRIZES[prizeIndex];
      
      setTimeout(() => {
        if(prize.type === "coins") {
          playerCoins += prize.value;
          localStorage.setItem("playerCoins", playerCoins);
          alert(`🎉 Wygrałeś: ${prize.name}!`);
        } else if(prize.type === "skin") {
          if(!ownedSkins.includes(prize.value)) {
            ownedSkins.push(prize.value);
            localStorage.setItem("ownedSkins", JSON.stringify(ownedSkins));
            alert(`🎉 Wygrałeś: Tęczowy Skin , teraz wez sie w końcu za robote!`);
          } else {
            alert(`nie próbuj dwa razy xddddd!`);
          }
        } else {
          alert(`😢 dobrze ci tak`);
        }
        renderShop();
      }, 500);
    }
  }
  
  animate();
}

function updateWheelCooldown() {
  const now = Date.now();
  const cooldownRemaining = 300000 - (now - lastSpinTime);
  
  if(cooldownRemaining > 0) {
    const minutes = Math.floor(cooldownRemaining / 60000);
    const seconds = Math.floor((cooldownRemaining % 60000) / 1000);
    document.getElementById("wheelCooldown").textContent = `Poczekaj nie widzisz?: ${minutes}m ${seconds}s`;
    spinBtn.disabled = true;
  } else {
    document.getElementById("wheelCooldown").textContent = "udało się! Kręć kołem!";
    spinBtn.disabled = false;
  }
}

if(spinBtn) {
  spinBtn.addEventListener("click", spinWheel);
  drawWheel();
  updateWheelCooldown();
  setInterval(updateWheelCooldown, 1000);
}

// Initial render
renderShop();
renderAchievements();