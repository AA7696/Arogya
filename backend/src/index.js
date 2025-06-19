import dotenv from 'dotenv'
import { app } from './app.js';
import connectDb from './db/db.js';


dotenv.config({
    path:  "./config/.env"
})


const start = async () =>{
    try {
        await connectDb(process.env.MONGODB_URI)
        app.listen(process.env.PORT,() =>{
            console.log("Server is connected");
        })
    } catch (error) {
        console.log(error);     
    }
}

start();
