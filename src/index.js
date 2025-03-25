import express, { urlencoded } from "express";
import { config } from "dotenv";
import mongoose from 'mongoose';
import ConnectDb from "./config/db.js";
import helmet from "helmet"

import projectRoutes from "./routes/projectRoutes.js";

config();


async function main() {
    const app = express();
    const PORT = process.env.PORT;

    app.use(helmet()); // Adiciona headers de segurança
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        express.json()(req, res, (err) => {
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                return res.status(400).json({ message: 'JSON inválido', status: 400 });
            }
            next();
        });
    });

    const db = new ConnectDb(process.env.MONGO_CS);
    db.connect()

    app.use('/api', projectRoutes)
    app.use((req, res) => {
        res.status(404).json({
            message: "Não encontrado",
            status: 404
        })
    })


    try {
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

main();