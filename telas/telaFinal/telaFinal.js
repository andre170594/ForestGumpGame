export function mostrarTelaFinal(callbackMenu, callbackCreditos) {
    // Carrega o conteúdo do HTML da tela final
    fetch('/telas/telaFinal/telaFinal.html')
        .then(response => response.text())
        .then(html => {
            // Adiciona o HTML carregado no DOM
            const container = document.createElement('div');
            container.innerHTML = html;
            const finalDiv = container.querySelector('#finalTela');

            // Configura os botões
            const botaoMenu = finalDiv.querySelector('.botaoMenu');
            const botaoCreditos = finalDiv.querySelector('.botaoCreditos');

            botaoMenu.addEventListener("click", () => {
                document.body.removeChild(finalDiv); // Remove a tela final
                if (callbackMenu) {
                    callbackMenu(); // Callback para o menu
                }
            });

            botaoCreditos.addEventListener("click", () => {
                document.body.removeChild(finalDiv); // Remove a tela final
                if (callbackCreditos) {
                    callbackCreditos(); // Callback para os créditos
                }
            });

            // Adiciona a tela ao body
            document.body.appendChild(finalDiv);
        })
        .catch(error => console.error("Erro ao carregar o HTML da tela final:", error));
}
