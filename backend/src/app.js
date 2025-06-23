import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoute.js'
import aiRoutes from './routes/aiRoute.js'


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(cookieParser());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/ai', aiRoutes);


export {app}