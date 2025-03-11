import Jogo from "./jogo.js";

// Variáveis globais
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Criar e iniciar o jogo
const jogo = new Jogo(ctx, canvas);
jogo.configurarJogo();
jogo.iniciar();
