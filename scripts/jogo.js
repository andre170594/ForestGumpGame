import { nivel1, nivel2, nivel3 } from "./niveis.js";
import Jogador from "./jogador.js";
import { mostrarTelaInicial,  } from "/telas/telaInicial/telaInicial.js";
import { mostrarTelaTransicao } from "/telas/telaTransicao/telaTransicao.js"
import { mostrarTelaFinal } from "/telas/telaFinal/telaFinal.js";
import {mostrarTelaCreditos} from "/telas/telaCreditos/telaCreditos.js";

                                                                                                                         // CLASS JOGO CONTROLA TUDO (CEREBRO!)
export default class Jogo {                                                                                              // RECEBE CONTEXTO E CANVAS
    constructor(ctx, canvas) {
        this.ctx = ctx;                                                                                                  // VAR PARA CONTEXTO
        this.canvas = canvas;                                                                                            // VAR PARA CANVAS
        this.niveis = [];                                                                                                // VAR LISTA DE NIVEIS
        this.nivelAtual = 0;                                                                                             // TRACKING DO NIVEL ATUAL
        this.jogador = null;                                                                                             // JOGADOR ASSOCIADO AO JOGO
        this.emTransicao = false;                                                                                        // FLAG para controlar a transição
        this.listenersConfigurados = false;                                                                              // FLAG para configurar listernes uma vez apenas
        this.loopAtivo = false;                                                                                          // Garantir que apenas um Loop corre (evita aceleração)
    }

    configurarJogo() {                                                                                             // CONFIG INICIAL DO JOGO
        this.niveis.push(nivel1);                                                                                        // PUXA OS NIVEIS EXISTENTES EM NIVEIS.JS
        this.niveis.push(nivel2);
        this.niveis.push(nivel3);
        this.jogador = new Jogador(100, 400, 50, 50, "blue", this.canvas);                        // CRIA NOVO JOGADOR
        this.configurarListeners()
    }

    configurarListeners() {
        if (!this.listenersConfigurados) {
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
                    case "t": // Temporário para testar progressão de níveis
                        this.niveis[this.nivelAtual].incrementarContadorT();
                        break;
                }
            });
            window.addEventListener("keyup", (event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    this.jogador.parar();
                }
            });
            this.listenersConfigurados = true;
        }
    }

    iniciar() {
        mostrarTelaInicial(() => {
            this.canvas.style.display = "block";
            if (!this.loopAtivo) {
                this.loopAtivo = true;
                this.loop();
            }
        });
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.atualizar(0.8);
        this.desenhar();
        requestAnimationFrame(() => this.loop());
    }

    atualizar(gravidade) {
        if (this.niveis[this.nivelAtual]) {
            this.niveis[this.nivelAtual].atualizar();
            // Verifica se o objetivo do nível foi concluído
            if (this.niveis[this.nivelAtual].objetivoConcluido && !this.emTransicao) {
                this.transitarParaProximoNivel();
                return;
            }
        }
        this.jogador.atualizar(gravidade);
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
            `Nível: ${this.niveis[this.nivelAtual].nome}`,
            10,
            30
        );

        // DEBUG
        this.ctx.font = "12px Arial"; // Estilo da fonte
        this.ctx.fillText(
            `TPressed: ${this.niveis[this.nivelAtual].contadorT}`,
            700,
            30
        );
        this.ctx.fillText(
            `X_velocity:: ${this.jogador.velocidadeX}`,
            700,
            45
        );
        this.ctx.fillText(
            `Y_velocity:: ${this.jogador.velocidadeY}`,
            700,
            60
        );
    }

    transitarParaProximoNivel() {
        if (this.emTransicao)                                                                                           // Bloqueia múltiplas transições simultâneas
            return;
        this.emTransicao = true;

        if (this.nivelAtual + 1 < this.niveis.length) {
            mostrarTelaTransicao(
                true,
                () => {
                    this.nivelAtual++; // Avança para o próximo nível
                    this.niveis[this.nivelAtual].reiniciarObjetivo(); // Reinicia o próximo nível
                    this.emTransicao = false; // Libera a transição
                },
                null
            );
        } else {
            mostrarTelaFinal(
                () => {
                    this.backToBegin();
                },
                () => {
                    mostrarTelaCreditos(() => {
                        this.backToBegin();
                    });
                }
            );
        }
    }

    backToBegin(){
        this.canvas.style.display = "none";
        this.nivelAtual = 0;
        this.niveis[this.nivelAtual].reiniciarObjetivo();
        this.emTransicao = false;
        mostrarTelaInicial(() => {
            this.canvas.style.display = "block";
        });
    }

}
