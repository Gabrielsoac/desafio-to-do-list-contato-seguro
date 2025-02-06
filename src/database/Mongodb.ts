import mongoose from "mongoose";
import 'dotenv/config';

const USER = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;

const dbURI = `mongodb://${USER}:${PASSWORD}@localhost:27017/tasks?authSource=admin`;

export const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Banco de Dados conectado com sucesso!");
    } catch(err){
        console.log(`Erro ao conectar com o Banco de Dados: ${(err as Error).message}`);
        process.exit(1);
    }
}