import express, {Request, Response} from 'express';
import cors from "cors";
import { articleRouter } from './router/articleRouter';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

app.use("/articles", articleRouter)