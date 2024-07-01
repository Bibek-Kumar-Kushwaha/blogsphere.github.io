import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 Characters Long"],
        maxLength: [32, "Name must be at most 32 Characters Long"],
     
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator:[validator.email, "Please Provide valid Email"]
    },
    password: {
        type : String,
        required: true,
  
    },
    role: {
        type: String,
        enum: ["Author","Reader","Admin"],
        required: true,
    }
},
{timestamps: true}
)

const userModel = mongoose.model("User", userSchema);
export default userModel;