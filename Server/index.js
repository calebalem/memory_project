import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';


const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> app.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`)))
        .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);