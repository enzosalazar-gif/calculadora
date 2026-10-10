const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares para permitir requisições de outras origens e ler o body em JSON
app.use(cors());
app.use(express.json());

// Valida os dois números recebidos; devolve true se estiver tudo certo
const validarNumeros = (req, res) => {
  const { num1, num2 } = req.body || {};

  if (typeof num1 !== 'number' || typeof num2 !== 'number' ||
      !Number.isFinite(num1) || !Number.isFinite(num2)) {
    res.status(400).json({ erro: 'Envie num1 e num2 como números válidos.' });
    return false;
  }
  return true;
};

// 1. Rota de Soma
app.post('/soma', (req, res) => {
  if (!validarNumeros(req, res)) return;
  const { num1, num2 } = req.body;
  res.json({ resultado: num1 + num2 });
});

// 2. Rota de Subtração
app.post('/subtracao', (req, res) => {
  if (!validarNumeros(req, res)) return;
  const { num1, num2 } = req.body;
  res.json({ resultado: num1 - num2 });
});

// 3. Rota de Multiplicação
app.post('/multiplicacao', (req, res) => {
  if (!validarNumeros(req, res)) return;
  const { num1, num2 } = req.body;
  res.json({ resultado: num1 * num2 });
});

// 4. Rota de Divisão
app.post('/divisao', (req, res) => {
  if (!validarNumeros(req, res)) return;
  const { num1, num2 } = req.body;

  if (num2 === 0) {
    return res.status(400).json({ erro: 'Não é possível dividir por zero.' });
  }
  res.json({ resultado: num1 / num2 });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
