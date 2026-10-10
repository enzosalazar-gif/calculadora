const API_BASE_URL = 'http://localhost:3000';

// Mostra a resposta (ou uma mensagem de erro) na tela
function exibirResultado(valor) {
    document.getElementById('resultValue').innerText = valor;
}

// Função genérica: lê os inputs, chama a rota e mostra o resultado
async function calcular(rota) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        exibirResultado('Preencha os dois números');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${rota}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1, num2 }),
        });

        const data = await response.json();

        if (!response.ok) {
            exibirResultado(data.erro || 'Erro no servidor');
            return;
        }

        exibirResultado(data.resultado);
    } catch (erro) {
        console.error(erro);
        exibirResultado('Servidor offline (rode npm start no backend)');
    }
}

// Funções chamadas pelos onclick do HTML
function somar()        { calcular('soma'); }
function subtrair()     { calcular('subtracao'); }
function multiplicar()  { calcular('multiplicacao'); }
function dividir()      { calcular('divisao'); }
