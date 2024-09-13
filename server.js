const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');  // Importação correta
const fastifyPostgres = require('fastify-postgres');

// Configurar a conexão com o PostgreSQL
fastify.register(fastifyPostgres, {
    connectionString: 'postgresql://vpinnovations_db_owner:ul3niGUBP6er@ep-lively-cell-a55e60i1.us-east-2.aws.neon.tech/vpinnovations_db?sslmode=require'
});

// Habilitar CORS para permitir o acesso ao servidor a partir de outro domínio/localhost
fastify.register(fastifyCors, {  // Uso da constante correta
    origin: '*'  // Configuração que permite o acesso de qualquer domínio
});

// Rota para adicionar um novo item (usuário master)
fastify.post('/add-item', async (request, reply) => {
    const { name } = request.body;
    const client = await fastify.pg.connect();
    try {
        const result = await client.query(
            'INSERT INTO gifts (name, selected_by) VALUES ($1, $2) RETURNING *', 
            [name, null]
        );
        reply.send(result.rows[0]);
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
    } finally {
        client.release();
    }
});

// Rota para marcar um item como escolhido por um usuário padrão
fastify.post('/select-item', async (request, reply) => {
    const { id, selectedBy } = request.body;
    const client = await fastify.pg.connect();
    try {
        const result = await client.query(
            'UPDATE gifts SET selected_by = $1 WHERE id = $2 RETURNING *', 
            [selectedBy, id]
        );
        reply.send(result.rows[0]);
    } finally {
        client.release();
    }
});

// Iniciar o servidor
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });  // Corrigido o método listen
        fastify.log.info(`Servidor rodando na porta 3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
