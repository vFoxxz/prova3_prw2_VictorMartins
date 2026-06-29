# API de Alunos

API desenvolvida em Node.js com Express para gerenciamento de alunos utilizando autenticação com JWT.

## Instalação

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

## Rotas

### Autenticação

- `POST /register` - Cadastrar usuário
- `POST /login` - Realizar login

### Alunos (protegidas por JWT)

- `GET /alunos`
- `GET /alunos/:id`
- `GET /alunos/medias`
- `GET /alunos/aprovados`
- `POST /alunos`
- `PUT /alunos/:id`
- `DELETE /alunos/:id`

## Autor

Victor Fonseca
