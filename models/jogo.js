import Jogador from "../models/jogador.js";
import NivelUm from "../niveis/nivelUm.js";
import NivelDois from "../niveis/nivelDois.js";


// A class jogo é o cerebro das operações.
// é quem controla a transição entre telas e entre niveis
// a logica de cada nivel é controlado dentro de cada nivel
// os diferentes niveis extendem NivelBase.
// A class Jogo chama metodos de nivelBase (não precisa de saber/controlar o que se passa dentro de cada nivel)

export default class Jogo {
    constructor(ctx, canvas,) {

        // Contexto e Canvas
        this.ctx = ctx;
        this.canvas = canvas;

        // Vars de Estado e Controlo
        this.nivelAtual = null;
        this.cntNivelAtual = 1;
        this.inGameLoop = false;
        this.score = 0;


        // Buttons
        this.botoesTransicao = document.getElementById("botoesTransicao");

        this.btnComecar = document.getElementById("btnComecar");
        this.btnProximoNivel = document.getElementById("btnProximoNivel");
        this.btnReiniciarNivel = document.getElementById("btnReiniciarNivel");
        this.btnVoltarInicio = document.getElementById("btnVoltarInicio");
        this.btnCreditos = document.getElementById("btnCreditos");

        this.btnComecar.addEventListener("click", () => this.StartGame());
        this.btnProximoNivel.addEventListener("click", () => this.iniciarProximoNivel());
        this.btnReiniciarNivel.addEventListener("click", () => this.reiniciarNivelAtual());
        this.btnVoltarInicio.addEventListener("click", () => this.voltarInicio());
        this.btnCreditos.addEventListener("click", () => this.showTelaCreditos());

    }

    StartGame() {
        // corre após click em botão começar jogo
        // limpa a tela
        // configura o primeiro nivel
        // e começa o jogo
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.btnComecar.style.display = "none";
        this.configurarJogo();
        this.iniciar();
    }
    configurarJogo() {
        // consoante o nivel atual, começa em 1
        // chama a função que cria o nivel e a função para os respetivos listeners

        let nivel;
        switch (this.cntNivelAtual) {
            case 1:
                 nivel = this.StartLvl1();
                 this.configuraListenersLvl1();
                break;
            case 2:
                nivel = this.StartLvl2();
                break;
            default:
                nivel = this.StartLvl1();
                break;
        }

        this.nivelAtual = nivel;
    }
    configuraListenersLvl1(){
        // para o nivel1 apenas saltar está contemplado
        window.addEventListener("keydown", (e) => {
            if ((e.code === "Space" || e.code === "ArrowUp") && !this.nivelAtual.finalizado) {
                this.nivelAtual.jogador.saltar();
            }
        });
    }
    iniciar() {
        // mete o loop do jogo a correr
        if (!this.inGameLoop) {
            this.inGameLoop = true;
            this.loop();
        }
    }
    loop() {
        // loop do jogo
        // enquanto o nivel não informar que está terminado continua em loop
        // atualiza o nivel Atual
        // e desenha os elementos (nivel,Jogador,Obstaculos. etc)
        // quando o nivel termina a função determina se deve mostrar a tela detransição entre niveis ou se já chegou ao fim cntNivelAtual = 3

        this.atualizar();
        this.desenhar();

        if (this.nivelAtual.getFinalizado()) {
            this.inGameLoop = false;
            this.cntNivelAtual++;

            if(this.cntNivelAtual === 3){
                this.showTelaFinal();
            }else{
                this.showTelaTransicao();
            }
        } else {
            requestAnimationFrame(() => this.loop());  // Continua o loop
        }
    }
    atualizar() {
            // pede ao nivel atual para atualizar as suas propriedades
            // matem track do score
            this.nivelAtual.atualizar(this.canvas);
            this.score= this.nivelAtual.getScore();

    }
    desenhar() {
            // pede ao nivel atual para desenhar os seus elementos
            this.nivelAtual.desenhar(this.ctx);
    }
    iniciarProximoNivel() {
        // trata de preparar o proximo nivel
        // voltando a configurar o proximo nivel
        // limpa a tela
        // e inicia de novo o loop
        this.configurarJogo();
        this.botoesTransicao.style.display = "none";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.iniciar();
    }
    reiniciarNivelAtual() {
        // Limpa a tela
        // para o loop e diminui o contador de niveis
        // de forma a voltar a configurar e iniciar o mesmo nivel

        this.botoesTransicao.style.display = "none";
        this.inGameLoop = false;
        this.cntNivelAtual--;
        this.configurarJogo();
        this.iniciar();
    }
    voltarInicio() {
        this.cntNivelAtual = 1;
        this.inGameLoop = false;
        this.btnCreditos.style.display = "none";
        this.btnVoltarInicio.style.display = "none";
        this.showTelaInicial(); o
    }


    // TELAS
    showTelaInicial() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgb(21,23,18)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Bem vindo ao Forrest Runner", this.canvas.width / 2 - 150, this.canvas.height / 2 - 30);

        // botões
        this.botoesTransicao.style.display = "block";
        this.btnComecar.style.display = "block";
        this.btnCreditos.style.display ="none";
        this.btnVoltarInicio.style.display = "none";
        this.btnProximoNivel.style.display = "none";
        this.btnReiniciarNivel.style.display = "none";
    }
    showTelaTransicao() {
        this.ctx.fillStyle = "rgb(52,82,135)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`${this.nivelAtual.getTitulo()}`, this.canvas.width / 2 - 150, 100);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Chegou ao Fim!", this.canvas.width / 2 - 150, this.canvas.height / 2 - 30);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2 - 150, this.canvas.height / 2);

        // botões
        this.botoesTransicao.style.display = "block";
        this.btnCreditos.style.display = "none";
        this.btnVoltarInicio.style.display = "none";
        this.btnProximoNivel.style.display = "block";
        this.btnReiniciarNivel.style.display = "block";
    }
    showTelaFinal() {

        this.ctx.fillStyle = "rgb(78,13,13)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Chegou ao Fim do jogo!", this.canvas.width / 2 - 150, this.canvas.height / 2 - 30);

        // botões
        this.botoesTransicao.style.display = "block";
        this.btnCreditos.style.display ="block";
        this.btnVoltarInicio.style.display = "block";
        this.btnProximoNivel.style.display = "none";
        this.btnReiniciarNivel.style.display = "none";
    }
    showTelaCreditos(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "rgba(79,142,13,0.7)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Jogo desenvolvido por Jhonny", this.canvas.width / 2 - 150, this.canvas.height / 2 - 30);

        // botões
        this.botoesTransicao.style.display = "block";
        this.btnCreditos.style.display ="none";
        this.btnVoltarInicio.style.display = "block";
        this.btnProximoNivel.style.display = "none";
        this.btnReiniciarNivel.style.display = "none";

    }


    // NIVEIS
    StartLvl1() {
        // cria Jogador com as caracteristicas base
        // cria nivel e passa jogador
        // retorna o nivel pronto a usar pela class Jogo

        var fundo = new Image(800, 600);
        fundo.src = "assets/images/fundoLevel1Final.png";
        const jogador = new Jogador(100, 600, 80, 140, "assets/images/Forrest2.png");
        return new NivelUm(this.canvas,jogador,"Corrida com obstáculos", fundo, {
            gravidade: 0.4,
            alturaChao: 520,
            velocidade: 2,
            alturaJump: -20,
            movimentoHorizontal: true
        });
    }
    StartLvl2() {
        // cria Jogador com as caracteristicas base
        // cria nivel e passa jogador
        // retorna o nivel pronto a usar pela class Jogo

        var fundo = new Image(800, 600);
        fundo.src = "assets/images/fundo2.jpg";
        const jogador = new Jogador(100, 460, 50, 50, "assets/images/fundo2.jpg");
        return new NivelDois(this.canvas,jogador,"Football", fundo, {
            gravidade: 0.7,
            alturaChao: 500,
            velocidade: 3,
            alturaJump: -17,
            movimentoHorizontal: true
        });

    }
}






