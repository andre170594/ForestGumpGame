import { nivel1, nivel2, nivel3 } from "./niveis.js";
import Jogador from "./jogador.js";
import { mostrarTelaInicial, ocultarTelaInicial } from "/telas/telaInicial.js";
import { mostrarTelaTransicao } from "/telas/telaTransicao.js"
import { mostrarTelaFinal } from "/telas/telaFinal.js";
import {mostrarTelaCreditos} from "/telas/telaCreditos.js";

                                                                                                                         // CLASS JOGO CONTROLA TUDO (CEREBRO!)
export default class Jogo {                                                                                              // RECEBE CONTEXTO E CANVAS
    constructor(ctx, canvas) {
        this.ctx = ctx;                                                                                                  // VAR PARA CONTEXTO
        this.canvas = canvas;                                                                                            // VAR PARA CANVAS
        this.niveis = [];                                                                                                // VAR LISTA DE NIVEIS
        this.nivelAtual = 0;                                                                                             // TRACKING DO NIVEL ATUAL
        this.jogador = null;                                                                                             // JOGADOR ASSOCIADO AO JOGO
        this.emTransicao = false;                                                                                        // FLAG para controlar a transição
    }

    configurarJogo() {                                                                                             // CONFIG INICIAL DO JOGO
        this.niveis.push(nivel1);                                                                                        // PUXA OS NIVEIS EXISTENTES EM NIVEIS.JS
        this.niveis.push(nivel2);
        this.niveis.push(nivel3);
        this.jogador = new Jogador(100, 400, 50, 50, "blue", this.canvas);                        // CRIA NOVO JOGADOR

        // Listeners para movimentação
        window.addEventListener("keydown", (event) => {                                   // CRIA LISTENERS DE MOVIMENTO
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
                case "t":                                                                                                // TEMPORARIO PARA TESTER LVL PROGRESSION
                    this.niveis[this.nivelAtual].incrementarContadorT()
                    break;
            }
        });
        window.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                this.jogador.parar();
            }
        });
    }


    iniciar() {                                                                                                    // INICIA O JOGO COM TELA INICIAL
        mostrarTelaInicial(); // Mostra a tela inicial
        ocultarTelaInicial(() => {
            this.canvas.style.display = "block"; // Exibe o canvas do jogo
            this.loop(); // Inicia o loop principal do jogo
        });
    }


    atualizar(gravidade) {
        if (this.niveis[this.nivelAtual]) {
            this.niveis[this.nivelAtual].atualizar();

            // Verifica se o objetivo do nível foi concluído
            if (this.niveis[this.nivelAtual].objetivoConcluido && !this.emTransicao) {
                this.transitarParaProximoNivel(); // Chama a lógica de transição
                return;
            }
        }
        if (this.jogador) {
            this.jogador.atualizar(gravidade);
        }
    }


    transitarParaProximoNivel() {
        if (this.emTransicao) return; // Bloqueia múltiplas transições simultâneas
        this.emTransicao = true;

        if (this.nivelAtual + 1 < this.niveis.length) {
            // Exibe a tela de transição entre os níveis
            mostrarTelaTransicao(
                true,
                () => {
                    console.log("Avançando para o próximo nível");
                    this.nivelAtual++; // Avança para o próximo nível
                    this.niveis[this.nivelAtual].reiniciarObjetivo(); // Reinicia o próximo nível
                    this.emTransicao = false; // Libera a transição
                },
                null
            );
        } else {
            // Exibe a tela final quando todos os níveis foram concluídos
            console.log("Exibindo a tela final do jogo");
            mostrarTelaFinal(
                () => {
                    console.log("Voltar ao menu inicial");
                    this.backToBegin();
                },
                () => {
                    console.log("Ver Créditos");
                    mostrarTelaCreditos(() => {
                        this.backToBegin();
                    });
                }
            );
        }
    }

    backToBegin(){
        this.canvas.style.display = "none"; // Esconde o canvas
        this.nivelAtual = 0; // Reinicia o progresso
        this.niveis[this.nivelAtual].reiniciarObjetivo(); // Reinicia o contador TPressed
        this.emTransicao = false; // Libera a transição
        mostrarTelaInicial(() => {
            this.canvas.style.display = "block"; // Mostra o canvas
            this.loop(); // Reinicia o loop do jogo
        }); // Exibe a tela inicial novamente
    }


    desenhar() {                                                                                                  // DESENHA ELEMENTOS APOS UPDATE
        if (this.niveis[this.nivelAtual]) {
            this.niveis[this.nivelAtual].desenhar(this.ctx);
        }
        if (this.jogador) {
            this.jogador.desenhar(this.ctx);
        }
        this.ctx.fillStyle = "black";
        this.ctx.font = "24px Arial";
        this.ctx.fillText(
            `Nível: ${this.niveis[this.nivelAtual].nome}`, // Texto a ser exibido
            10, // Posição horizontal
            30 // Posição vertical
        );
        this.ctx.font = "12px Arial"; // Estilo da fonte
        this.ctx.fillText(
            `TPressed: ${this.niveis[this.nivelAtual].contadorT}`, // Texto a ser exibido
            700, // Posição horizontal
            30 // Posição verticalt
        );
    }

    loop() {                                                                                                       // LOOP DO JOGO
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.atualizar(0.8);
        this.desenhar();
        requestAnimationFrame(() => this.loop());
    }
}
