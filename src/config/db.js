import mongoose from "mongoose";
import { config } from "dotenv";

config();

class ConnectDb {
    constructor(mongo_cs) {
        this.mongo_cs = mongo_cs;
    }

    async connect() {
        try {
            const dbResult = await mongoose.connect(process.env.MONGO_CS);

            this.db = dbResult
            return dbResult;
        } catch (error) {
            console.log('projectCatch=====', error)
            return null
        }
    }
}

export default ConnectDb;