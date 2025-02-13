import express from "express";
import referralRoute from './routes/referralRoute.js';
import cors from 'cors';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", referralRoute);

app.listen(PORT, () => {
    console.log(`Server Live on Port ${PORT}`);
});