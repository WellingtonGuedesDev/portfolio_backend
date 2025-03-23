import express from "express";
import { config } from "dotenv";
 
config()
function main() {
    const app = express();
    const PORT = process.env.PORT;

    app.get('/', (req, res) => {
        res.send("Hello world")
    })

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
}

main()