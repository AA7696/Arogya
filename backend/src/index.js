import dotenv from 'dotenv'
import { app } from './app.js';


dotenv.config({
    path:  "./config/.env"
})


const start = async () =>{
    try {
        app.listen(process.env.PORT,() =>{
            console.log("Server is connected");
        })
    } catch (error) {
        console.log(error);     
    }
}

start();
