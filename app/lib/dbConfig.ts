import { error } from "console";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

export async function connect() {
    try {
        mongoose.connect(MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected succesfully");
            
        });

        connection.on('error', (err) => {
            console.log("MONGODB connection error" + err);
            process.exit();
        });

    } catch (error) {
        console.log(error);
        
    }
}