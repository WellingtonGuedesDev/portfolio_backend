import express, { urlencoded } from "express";
import { config } from "dotenv";
import mongoose from 'mongoose';
import ConnectDb from "./config/db.js";

config();


async function main() {
    const app = express();
    const PORT = process.env.PORT;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())

    const db = new ConnectDb(process.env.MONGO_CS);
    db.Connect()

    app.get('/', (req, res) => {
        res.json({ message: "Api funcionando" })
    });

    

    try {
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

main();