import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express.Router();

const alunos = [
    {
        id: 1,
        nome: "Asdrubal",
        ra: "11111",
        nota1: 8.5,
        nota2: 9.5
    },
    {
        id: 2,
        nome: "Lupita",
        ra: "22222",
        nota1: 7.5,
        nota2: 7
    },
    {
        id: 3,
        nome: "Zoroastro",
        ra: "33333",
        nota1: 3,
        nota2: 4
    }
];

const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Acesso negado! Token não fornecido."
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) {
            return res.status(403).json({
                message: "Token inválido!"
            });
        }

        req.user = user;

        next();
    });
};

app.use(authenticateJWT);

app.get('/alunos', (req, res) => {
    res.json(alunos);
});

app.get('/alunos/medias', (req, res) => {

    const medias = alunos.map(a => ({
        nome: a.nome,
        media: (a.nota1 + a.nota2) / 2
    }));

    res.json(medias);
});

app.get('/alunos/aprovados', (req, res) => {
    const aprovados = alunos.map(a => {
        const media = (a.nota1 + a.nota2) / 2;
        return {
            nome: a.nome,
            status: media >= 6 ? "aprovado" : "reprovado"
        };
    });

    res.json(aprovados);
});

app.post('/alunos', (req, res) => {
    alunos.push(req.body);
    res.status(201).json({
        message: "Aluno criado com sucesso!"
    });
});

app.get('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === Number(req.params.id));
    if (!aluno) {
        return res.status(404).json({
            message: "Aluno não encontrado!"
        });
    }
    res.json(aluno);
});

app.put('/alunos/:id', (req, res) => {
    const index = alunos.findIndex(a => a.id === Number(req.params.id));
    if (index === -1) {
        return res.status(404).json({
            message: "Aluno não encontrado!"
        });
    }
    alunos[index] = {...alunos[index], ...req.body};

    res.json(alunos[index]);
});

app.delete('/alunos/:id', (req, res) => {
    const index = alunos.findIndex(a => a.id === Number(req.params.id));
    if (index === -1) {
        return res.status(404).json({
            message: "Aluno não encontrado!"
        });
    }
    alunos.splice(index, 1);
    res.json({
        message: "Aluno removido!"
    });
});

export default app;