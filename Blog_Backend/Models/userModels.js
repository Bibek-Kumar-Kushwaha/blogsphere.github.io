import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        uppercase: true,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [32, "Name must be at most 32 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be at least 8 characters long"],
        maxLength: [16, "Password must be at most 16 characters long"],
    },
    role: {
        type: String,
        enum: ["Author", "Reader", "Admin"],
        required: true,
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
export default userModel;
