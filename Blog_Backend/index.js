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
    origin: [
        "https://blogsphere-github-io-zqmc.vercel.app",
        "https://www.bibekkumarkushwaha.com.np"
    ],
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Set-Cookie'
    ],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json());
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
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Connect to Database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});

export default app;