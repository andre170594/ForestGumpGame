import Jogo from "./jogo.js";

// GLOBAL VARS
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

const jogo = new Jogo(ctx, canvas);
jogo.showTelaInicial();


// Script associado ao index.html
// é onde o jogo começa ao instanciar um objeto do tipo Jogo
// e ao mostrar a primeira tela