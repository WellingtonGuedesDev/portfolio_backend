import mongoose from "mongoose";
import { config } from "dotenv";

config();

class ConnectDb {
    constructor(mongo_cs) {
        this.mongo_cs = mongo_cs;
    }

    async Connect() {
        try {
            const dbResult = await mongoose.connect(process.env.MONGO_CS);

            return dbResult;
        } catch (error) {
            return "Error ao conectar no db ", error;
        }
    }
}

export default ConnectDb;