import { nivel1, nivel2, nivel3 } from "./niveis.js";
import Jogador from "./jogador.js";
import { mostrarTelaInicial, ocultarTelaInicial } from "/telas/telaInicial.js";


export default class Jogo {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.niveis = [];
        this.nivelAtual = 0;
        this.jogador = null;
    }

    configurarJogo() {
        this.adicionarNivel(nivel1);
        this.adicionarNivel(nivel2);
        this.adicionarNivel(nivel3);
        this.jogador = new Jogador(100, 400, 50, 50, "blue", this.canvas);

        // Listeners para movimentação
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.jogador.mover("esquerda");
                    break;
                case "ArrowRight":
                    this.jogador.mover("direita");
                    break;
                case " ":
                    this.jogador.saltar();
                    break;
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                this.jogador.parar();
            }
        });
    }


    adicionarNivel(nivel) {
        this.niveis.push(nivel);
    }


    iniciar() {
        mostrarTelaInicial(); // Mostra a tela inicial
        ocultarTelaInicial(() => {
            this.canvas.style.display = "block"; // Exibe o canvas do jogo
            this.loop(); // Inicia o loop principal do jogo
        });
    }


    atualizar(gravidade) {
        if (this.niveis[this.nivelAtual]) {
            this.niveis[this.nivelAtual].atualizar();
        }
        if (this.jogador) {
            this.jogador.atualizar(gravidade);
        }
    }

    desenhar() {
        if (this.niveis[this.nivelAtual]) {
            this.niveis[this.nivelAtual].desenhar(this.ctx);
        }
        if (this.jogador) {
            this.jogador.desenhar(this.ctx);
        }
        this.ctx.fillStyle = "black"; // Cor do texto
        this.ctx.font = "24px Arial"; // Estilo da fonte
        this.ctx.fillText(
            `Nível: ${this.niveis[this.nivelAtual].nome}`, // Texto a ser exibido
            10, // Posição horizontal
            30 // Posição vertical
        );
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.atualizar(0.8); // Atualiza o estado do jogo
        this.desenhar(); // Desenha os elementos no canvas
        requestAnimationFrame(() => this.loop());
    }
}
