const { validateNewItem, validateItemSelection } = require('../utils/validation');

module.exports = async function (fastify, opts) {
  
  fastify.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Rota para adicionar um novo item
  console.log('Registrando rota /add-item');
  fastify.post('/add-item', async (request, reply) => {
    const { name } = request.body;

    // Validação dos dados
    const { error } = validateNewItem({ name });
    if (error) return reply.code(400).send({ error: error.details[0].message });

    const client = await fastify.pg.connect();
    try {
      const result = await client.query('INSERT INTO gifts (name, selected_by) VALUES ($1, $2) RETURNING *', [name, null]);
      reply.send(result.rows[0]);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Erro ao adicionar item.' });
    } finally {
      client.release();
    }
  });

  // Rota para listar todos os itens
  fastify.get('/items', async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const result = await client.query('SELECT * FROM gifts');
      reply.send(result.rows);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Erro ao listar itens.' });
    } finally {
      client.release();
    }
  });

  // Rota para marcar um item como escolhido
  fastify.post('/select-item', async (request, reply) => {
    const { id, selectedBy } = request.body;

    // Validação dos dados
    const { error } = validateItemSelection({ id, selectedBy });
    if (error) return reply.code(400).send({ error: error.details[0].message });

    const client = await fastify.pg.connect();
    try {
      const result = await client.query('UPDATE gifts SET selected_by = $1 WHERE id = $2 RETURNING *', [selectedBy, id]);
      reply.send(result.rows[0]);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Erro ao selecionar item.' });
    } finally {
      client.release();
    }
  });

  // Rota para resumo de itens selecionados
  fastify.get('/summary', async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const result = await client.query('SELECT * FROM gifts WHERE selected_by IS NOT NULL');
      reply.send(result.rows);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Erro ao obter resumo.' });
    } finally {
      client.release();
    }
  });
};
