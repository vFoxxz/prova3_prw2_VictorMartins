import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express.Router();

const users = [];

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        username,
        password: hashedPassword
    });

    res.status(201).json({
        message: "Usuário criado!"
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {

        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({
            message: `Login feito pelo usuário ${user.username}`,
            jwt: token
        });
    }

    res.status(401).json({
        message: "Login Incorreto!"
    });
});

export default app;