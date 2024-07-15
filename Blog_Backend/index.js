import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './Config/connectDB.js';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userRoutes.js';
import blogRouter from './Routes/blogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: "https://blogsphere-github-io-zqmc.vercel.app",
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH", "HEAD"],
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 
}));
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
