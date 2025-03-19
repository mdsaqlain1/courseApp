import express from 'express';
import mongoose from 'mongoose';
import { router as adminRoutes } from './routes/admin.js';
import { router as userRoutes } from './routes/user.js';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGODB_URI, { dbName: "courses" })
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});
app.listen(3000, ()=> console.log("Server is running on port 3000"));