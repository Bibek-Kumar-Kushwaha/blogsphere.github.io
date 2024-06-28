import mongoose from 'mongoose';

const connectDB = async () => {
try {
    await mongoose.connect(process.env.URI, {dbName:process.env.DBNAME});
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Connection error:', error);
}
}

export default connectDB;