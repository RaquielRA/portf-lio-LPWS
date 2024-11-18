// Seleciona os elementos pelo ID
const resultado = document.getElementById('resultado');
const reset = document.getElementById('reset');
const delButton = document.getElementById('delete'); // Seleciona o botão de delete
const buttons = Array.from(document.querySelectorAll('.teclas button'));

let currentInput = ""; // Entrada atual do usuário

// Atualiza a tela com o valor atual
const updateDisplay = (value) => {
    resultado.textContent = value || "0"; // Se value for vazio, mostra "0"
};

// Inicializa a tela com "0"
updateDisplay("0");

// Função para limpar a calculadora
const resetCalculator = () => {
    currentInput = "";
    updateDisplay("0");
};

// Função para calcular a expressão
const calculate = () => {
    try {
        // Avalia a expressão e atualiza a tela
        const result = eval(currentInput); // Usamos eval para calcular a expressão
        updateDisplay(result);
        currentInput = result.toString(); // Atualiza currentInput com o resultado
    } catch (error) {
        updateDisplay("Error"); // Em caso de erro, mostra "Error"
        currentInput = ""; // Reseta o input em caso de erro
    }
};

// Função para deletar o último caractere
const deleteLastCharacter = () => {
    currentInput = currentInput.slice(0, -1); // Remove o último caractere
    updateDisplay(currentInput); // Atualiza a tela
};

// Adiciona eventos de clique para cada botão
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.textContent; // Obtém o valor do botão clicado

        if (!isNaN(value) || value === '.') { // Verifica se é um número ou ponto
            currentInput += value; // Adiciona ao input atual
            updateDisplay(currentInput); // Atualiza a tela
        } else if (value === 'C') { // Se for o botão "C"
            resetCalculator(); // Limpa a calculadora
        } else if (value === '=') { // Se for o botão "="
            calculate(); // Calcula o resultado
        } else { // Se for um operador
            currentInput += value; // Adiciona o operador ao input atual
            updateDisplay(currentInput); // Atualiza a tela
        }
    });
});

// Reseta a calculadora ao clicar no botão "C"
reset.addEventListener('click', resetCalculator);

// Deleta o último caractere ao clicar no botão "Delete"
delButton.addEventListener('click', deleteLastCharacter);
