// Explorador de Culturas - Tema: Festejando a Conexão Campo-Cidade
// Autoria dos elementos textuais: Estudante autor do projeto
// Ilustrações podem ser feitas com ferramentas como Piskel ou Paint (informar no README)
// Ferramenta usada: p5.js

let tela = "inicio";
let locais = [
  { nome: "Plantio de Milho", x: 100, y: 200, visitado: false },
  { nome: "Festa Junina", x: 300, y: 100, visitado: false },
  { nome: "Feira Cultural", x: 500, y: 250, visitado: false },
  { nome: "Grafite Urbano", x: 400, y: 400, visitado: false }
];
let personagem = { x: 50, y: 50, tamanho: 30 };
let mensagem = "";
let diario = [];

function setup() {
  createCanvas(600, 500);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  if (tela === "inicio") {
    mostrarTelaInicio();
  } else if (tela === "jogo") {
    jogar();
  } else if (tela === "diario") {
    mostrarDiario();
  }
}

function mostrarTelaInicio() {
  background(180, 220, 180);
  textSize(32);
  fill(0);
  text("Explorador de Culturas", width / 2, height / 3);
  textSize(16);
  text("Clique para começar a jornada!", width / 2, height / 2);
}

function mousePressed() {
  if (tela === "inicio") {
    tela = "jogo";
  } else if (tela === "diario") {
    tela = "inicio";
    reiniciarJogo();
  }
}

function jogar() {
  moverPersonagem();

  // Desenha locais culturais
  for (let local of locais) {
    fill(local.visitado ? "lightgray" : "orange");
    ellipse(local.x, local.y, 40);
    fill(0);
    textSize(12);
    text(local.nome, local.x, local.y - 25);
  }

  // Desenha personagem
  fill("blue");
  ellipse(personagem.x, personagem.y, personagem.tamanho);

  verificarColeta();

  // Exibir dica
  fill(0);
  textSize(14);
  text("Use as teclas WASD para explorar!", width / 2, height - 20);

  // Exibe mensagem temporária
  if (mensagem) {
    fill(50);
    textSize(16);
    text(mensagem, width / 2, 30);
  }

  // Verifica se todos foram visitados
  if (todosVisitados()) {
    tela = "diario";
  }
}

function moverPersonagem() {
  if (keyIsDown(87)) personagem.y -= 2; // W
  if (keyIsDown(83)) personagem.y += 2; // S
  if (keyIsDown(65)) personagem.x -= 2; // A
  if (keyIsDown(68)) personagem.x += 2; // D

  personagem.x = constrain(personagem.x, 0, width);
  personagem.y = constrain(personagem.y, 0, height);
}

function verificarColeta() {
  for (let local of locais) {
    if (!local.visitado && dist(personagem.x, personagem.y, local.x, local.y) < 30) {
      local.visitado = true;
      mensagem = "Você descobriu: " + local.nome;
      diario.push(local.nome);
      setTimeout(() => mensagem = "", 2000);
    }
  }
}

function todosVisitados() {
  return locais.every(local => local.visitado);
}

function mostrarDiario() {
  background(255, 250, 200);
  textSize(24);
  fill(0);
  text("Diário de Viagem Cultural", width / 2, 50);

  textSize(16);
  for (let i = 0; i < diario.length; i++) {
    text("- " + diario[i], width / 2, 100 + i * 30);
  }

  textSize(14);
  text("Clique para recomeçar", width / 2, height - 30);
}

function reiniciarJogo() {
  personagem.x = 50;
  personagem.y = 50;
  locais.forEach(l => l.visitado = false);
  diario = [];
  mensagem = "";
}
