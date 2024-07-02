import { encryptPassword, matchPassword } from '../Helper/userHelper.js';
import userModel from '../Models/userModels.js';
import jwt from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        // Extract data from request body
        const {username, email, password, role } = req.body;

        // Validate required fields
        if (!username || !email || !password || !role) {
            return res.status(400).send({ success: false, message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "You are already registered"
            });
        }

        // Encrypt user password
        const hashedPassword = await encryptPassword(password);

        // Create a new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            role,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .send({
                    success: false,
                    message: "Please provide all fields"
                });
        }

        // Check if user exists or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .send({
                    success: false,
                    message: "You haven't register yet!!!"
                });
        }

        // Check if the password matches
        const isMatchPassword = await matchPassword(password, user.password)
        if (!isMatchPassword) {
            return res
                .status(400)
                .send({
                    success: false, message: "Your credentials do not match"
                });
        }
        // JWT token generation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: `${process.env.EXPIRE_DAY || 1}d` });

        // Clear the password from the user object before sending it
        user.password = undefined;

        // Respond with success
        return res
            .cookie("token", token, { httpOnly: true, secure: true })
            .status(200)
            .send({ success: true, message: 'Login successful', user, token });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }


}

const logoutController = (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        return res
            .status(200)
            .send({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error('Error during logout:', error);
        return res
            .status(500)
            .send({ success: false, message: 'Internal Server Error' });
    }
};


export { registerController, loginController, logoutController };
