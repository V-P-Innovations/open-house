require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const fastifyPostgres = require('@fastify/postgres');
const fastifyJwt = require('@fastify/jwt');
const fastifyStatic = require('@fastify/static');
const path = require('path');

// Conexão com PostgreSQL
fastify.register(fastifyPostgres, {
  connectionString: process.env.POSTGRES_CONNECTION_STRING
});

// Habilitar JWT
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET });

// Habilitar CORS
fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST']
});

// Servir arquivos estáticos
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/'
});

// Rotas
fastify.register(require('./routes/auth.js'), { prefix: '/auth' });
fastify.register(require('./routes/items.js'), { prefix: '/api' });

// Iniciar o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Servidor rodando na porta 3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
