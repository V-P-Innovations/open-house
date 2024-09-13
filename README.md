# Open House - Lista de Chá de Casa Nova

Este é um projeto para gerenciar uma lista de chá de casa nova usando Fastify para o servidor back-end e PostgreSQL para o banco de dados. O sistema permite que um usuário master adicione itens à lista e que usuários padrão marquem os itens como escolhidos.

## Funcionalidades

- **Adicionar um Novo Item**: Permite que um usuário master adicione novos itens à lista de chá.
- **Listar Todos os Itens**: Permite que qualquer usuário visualize todos os itens da lista.
- **Marcar um Item como Escolhido**: Permite que um usuário padrão marque um item como escolhido, tornando-o indisponível para outros usuários.

## Tecnologias Utilizadas

- **Fastify**: Framework para criar servidores HTTP rápidos e eficientes.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **pgAdmin 4 e Neon.tech**: Ferramentas para gerenciamento e administração do banco de dados PostgreSQL.
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.

## Configuração do Ambiente

1. **Instalar Dependências**

   Certifique-se de ter o Node.js e npm instalados. Em seguida, instale as dependências do projeto:

   ```bash
   npm install
