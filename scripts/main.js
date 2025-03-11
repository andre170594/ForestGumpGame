import Jogo from "./jogo.js";


// GLOBAL VARS
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// START GAME
const jogo = new Jogo(ctx, canvas);
jogo.configurarJogo();
jogo.iniciar();
