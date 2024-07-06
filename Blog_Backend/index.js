import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/connectDB.js';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userRoutes.js';
import blogRouter from './Routes/blogRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your React frontend
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser());
// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);

// Root Route
app.get('/', (req, res) => {
    res.send("Hello, I am ready to serve!!!!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to Database
connectDB();

const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
