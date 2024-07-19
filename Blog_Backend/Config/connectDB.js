import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI,
            { dbName: process.env.DBNAME },
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
}

export default connectDB;