export function mostrarTelaInicial() {
    const telaInicial = document.getElementById("startScreen");
    telaInicial.style.display = "block"; // Mostra a tela inicial
    console.log("Tela inicial carregada!!");
}

export function ocultarTelaInicial(callbackIniciarJogo) {
    const startButton = document.getElementById("startButton");

    // Configura o evento de clique para iniciar o jogo
    startButton.addEventListener("click", () => {
        console.log("Botão clicado! Ocultando tela inicial...");
        const telaInicial = document.getElementById("startScreen");
        telaInicial.style.display = "none"; // Esconde a tela inicial

        if (callbackIniciarJogo) {
            console.log("Iniciando o jogo...");
            callbackIniciarJogo(); // Inicia o jogo ou primeiro nível
        }
    }, { once: true }); // Adiciona o evento apenas uma vez
}
