export function mostrarTelaInicial(callbackIniciarJogo) {
    const telaInicial = document.getElementById("startScreen");
    const startButton = document.getElementById("startButton");
    const gameCanvas = document.getElementById("gameCanvas");

    gameCanvas.style.display = "none";                                                                                  // Esconde o canvas inicialmente
    telaInicial.style.display = "block";                                                                                // Exibe a tela inicial


    startButton.addEventListener("click", () => {                                                     // Adiciona listener no botao, quando for clicked executa o callback
        telaInicial.style.display = "none";
        gameCanvas.style.display = "block";
        callbackIniciarJogo();
    });
}
