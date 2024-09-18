const jwt = require('jsonwebtoken');
const { validateLogin } = require('../utils/validation.js');
const { hashPassword, comparePassword } = require('../utils/authHelper.js');

module.exports = async function (fastify, opts) {
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;

    // Validação dos dados
    const { error } = validateLogin({ username, password });
    if (error) return reply.code(400).send({ error: error.details[0].message });

    // Exemplo básico de autenticação
    if (username !== 'admin' || !comparePassword(password, 'senhaSegura123')) {
      return reply.code(401).send({ error: 'Usuário ou senha inválidos.' });
    }

    // Verifica se a variável de ambiente JWT_SECRET está definida
    if (!process.env.JWT_SECRET) {
      console.error('Erro: variável de ambiente JWT_SECRET não definida');
      return reply.code(500).send({ error: 'Erro ao gerar token' });
    }

    // Gera JWT
    try {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Token gerado:', token);
      reply.send({ token });
    } catch (error) {
      console.error('Erro ao gerar token:', error);
      reply.code(500).send({ error: 'Erro ao gerar token' });
    };
  });
};