export function mostrarTelaInicial(callbackIniciarJogo) {
    const telaInicial = document.getElementById("startScreen");
    const startButton = document.getElementById("startButton");
    const novoBotao = startButton.cloneNode(true);

    // Mostra a tela inicial
    telaInicial.style.display = "block";
    startButton.parentNode.replaceChild(novoBotao, startButton);

    // Esconde o canvas inicialmente
    const gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.style.display = "none";

    // Quando o botão for clicado, oculta a tela inicial e mostra o canvas
    novoBotao.addEventListener("click", () => {
        telaInicial.style.display = "none";
        gameCanvas.style.display = "block"; // Exibe o canvas do jogo
        if (callbackIniciarJogo) {
            callbackIniciarJogo(); // Inicia o jogo (aqui você pode adicionar a lógica do jogo)
        }
    });
}

export function ocultarTelaInicial(callbackIniciarJogo) {
    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", () => {
        const telaInicial = document.getElementById("startScreen");
        telaInicial.style.display = "none";
        if (callbackIniciarJogo) {
            callbackIniciarJogo();
        }
    });
}
