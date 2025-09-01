import express from 'express'
import cors from 'cors'
import * as Sentry from "@sentry/node"
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoute.js'
import aiRoutes from './routes/aiRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(cookieParser());

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/aichat', aiRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/appointments', appointmentRoutes);

Sentry.setupExpressErrorHandler(app);

export {app}