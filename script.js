const senhaCorreta = "010625";
const musica = document.getElementById("musicaFundo");
musica.volume = 0.5;
musica.loop = true;

// Verifica senha e mostra o menu
function verificarSenha() {
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem-senha");

  if (senha === senhaCorreta) {
    document.getElementById("tela-senha").style.display = "none";
    document.getElementById("conteudo").style.display = "block";
    document.getElementById("menu").style.display = "flex"; // Mostra apenas o menu
  } else {
    mensagem.innerText = "Senha incorreta 💔";
    mensagem.className = "mensagem-alerta";
    setTimeout(() => (mensagem.innerText = ""), 3000);
  }
}

// SPA: navegação entre seções
function navegar(secao) {
  document.querySelectorAll(".secao").forEach((s) => (s.style.display = "none"));
  document.getElementById("menu").style.display = "none";
  document.getElementById(secao).style.display = "block";
  if (secao === "jogo") criarTabuleiro();
}

// Voltar ao menu principal
function voltarMenu() {
  document.querySelectorAll(".secao").forEach((s) => (s.style.display = "none"));
  document.getElementById("menu").style.display = "flex";
}

// Música
function toggleMusica() {
  const btn = document.getElementById("botao-musica");
  if (musica.paused) {
    musica.play();
    btn.innerText = "🎵 Desligar Música";
  } else {
    musica.pause();
    btn.innerText = "🎵 Ligar Música";
  }
}

// SLIDESHOW
const fotos = Array.from({ length: 12 }, (_, i) => `assets/fotos/${i + 1}.jpeg`);
let indiceFoto = 0;

function mostrarFoto() {
  document.getElementById("fotoSlide").src = fotos[indiceFoto];
}

function proximaFoto() {
  indiceFoto = (indiceFoto + 1) % fotos.length;
  mostrarFoto();
}

function fotoAnterior() {
  indiceFoto = (indiceFoto - 1 + fotos.length) % fotos.length;
  mostrarFoto();
}

// CALENDÁRIO DO AMOR
function calcularTempo() {
  const inicio = new Date("2025-06-01");
  const agora = new Date();
  const diff = agora - inicio;

  const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const meses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) % 12;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("tempo").innerText =
    `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}
setInterval(calcularTempo, 1000);

// JOGO DA MEMÓRIA
const imagens = Array.from({ length: 6 }, (_, i) => `assets/fotos/${i + 1}.jpeg`);
let cartas = [];
let selecionadas = [];
let bloqueado = false;

function criarTabuleiro() {
  const tabuleiro = document.getElementById("tabuleiro");
  cartas = [...imagens, ...imagens].sort(() => 0.5 - Math.random());
  tabuleiro.innerHTML = "";
  selecionadas = [];

  cartas.forEach((img, index) => {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.dataset.index = index;
    carta.onclick = virarCarta;
    tabuleiro.appendChild(carta);
  });
}

function virarCarta() {
  if (bloqueado) return;
  const index = this.dataset.index;
  if (selecionadas.includes(index)) return;

  this.style.backgroundImage = `url('${cartas[index]}')`;
  selecionadas.push(index);

  if (selecionadas.length === 2) {
    bloquearTemporariamente();
    setTimeout(verificarPar, 800);
  }
}

function bloquearTemporariamente() {
  bloqueado = true;
  setTimeout(() => (bloqueado = false), 1000);
}

function verificarPar() {
  const [i1, i2] = selecionadas;
  const carta1 = document.querySelector(`.carta[data-index='${i1}']`);
  const carta2 = document.querySelector(`.carta[data-index='${i2}']`);

  if (cartas[i1] !== cartas[i2]) {
    carta1.style.backgroundImage = "";
    carta2.style.backgroundImage = "";
  }

  selecionadas = [];

  const todasViradas = [...document.querySelectorAll(".carta")].every(
    (el) => el.style.backgroundImage !== ""
  );
  if (todasViradas) {
    const msg = document.createElement("div");
    msg.className = "mensagem-balao";
    msg.innerText = "Você conseguiu! Amo você com todo meu coração ❤️";
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }
}

// MENSAGEM FINAL
function mostrarMensagem() {
  document.getElementById("mensagemFinal").style.display = "block";
}

// Inicialização
window.onload = () => {
  mostrarFoto();
  calcularTempo();

  // Ao iniciar, esconde todas as seções e o menu
  document.querySelectorAll(".secao").forEach((s) => (s.style.display = "none"));
  document.getElementById("menu").style.display = "none";
  document.getElementById("conteudo").style.display = "none";
};
