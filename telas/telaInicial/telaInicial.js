export function mostrarTelaInicial(callbackIniciarJogo) {
    fetch('/telas/telaInicial/telaInicial.html')
        .then(response => response.text())
        .then(html => {
            const container = document.createElement('div');
            container.innerHTML = html;

            const telaInicial = container.querySelector('#startScreen');
            const startButton = telaInicial.querySelector('#startButton');

            document.getElementById('gameCanvas').style.display = 'none';                                       // Esconde o canvas e mostra a tela inicial
            document.body.appendChild(telaInicial);

            startButton.addEventListener('click', () => {                                                   // Configura o botão para iniciar o jogo
                telaInicial.remove(); // Remove a tela inicial do DOM
                document.getElementById('gameCanvas').style.display = 'block';
                callbackIniciarJogo();
            });
        });
}
