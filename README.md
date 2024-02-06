# Best Jobs

Projeto Best Jobs, uma plataforma simples para criar e compartilhar vagas de emprego. Contando com dois tipos de usuários, as empresas podem cadastrar vagas e aprovar/reprovar os candidatos; os candidatos podem cadastrar suas formações acadêmicas e experiências, e se perquisar e candidatar nas vagas publicadas. Projeto criado praticar o desenvolvimento. Esta aplicação web, construída com React com Vite no front-end e Node.js com Express, Prisma e PostgreSQL no back-end.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar algumas variáveis de ambiente;

### Front-End

No fron-end adicione a seguinte variável no seu ./frontend/.env

`VITE_BASE_API_URL`: contendo a url base para conexão com o back-end

### Back-End

No back-end adicione as seguintes variáveis no seu ./backend/.env

`DATABASE_URL`: contendo endereço do banco de dados, contendo usuário, senha e schema do poestgres;

`PORT`: porta em que a api deverá rodar;

`PWD_SECRET`: chave secreta para geração das hashs de senha;

`JWT_SECRET`: chave secreta para autenticação de token com JWT.

## Instalação

Sistema criado em containers Docker, para executar, instale-o em sua máquina.

Clone este repositório, entre na pasta './docker' e execute o seguinte comando:

```bash
  docker compose up
```

Após montar, execute os containers e configure o postgresql com usuário e senha através do pgAdmin pelo link localhost.

Rode as migrations no container 'backend' com o seguinte comando:

```bash
  npx prisma migrate dev
```

Por fim, rode o seeds no backend com o comando:

```bash
  npx prisma db seed
```

## Stack utilizada

**Front-end:** React, Redux, SASS, Axios, Typescript

**Back-end:** Node, Express, Prisma, Auth JWT, Typescript
