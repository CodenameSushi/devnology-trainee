import express from 'express';
import cors from "cors";
import { articleRouter } from './router/articleRouter';
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT || 3003

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`);
});

app.use("/articles", articleRouter)