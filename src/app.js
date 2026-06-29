import express from 'express';
import dotenv from 'dotenv';

import loginRoutes from './routes/loginRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(loginRoutes);
app.use(alunoRoutes);

export default app;