import { encryptPassword } from '../Helper/userHelper.js';
import userModel from '../Models/userModels.js';

const registerController = async (req, res) => {
    try {
        // Take data from user
        const { username, email, password, role } = req.body;

        // Validate required fields
        if (!username || !email || !password ) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "You are already registered"
            });
        }

        // Encrypting user password
        const hashedPassword = await encryptPassword(password);
        
        // Creating the user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export { registerController };
