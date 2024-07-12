import { encryptPassword, matchPassword } from '../Helper/userHelper.js';
import userModel from '../Models/userModels.js';
import jwt from 'jsonwebtoken';
import { uploadImageOnCloudinary } from '../Helper/coludinaryHelper.js';

//register 
const registerController = async (req, res) => {
    try {
        // Extract data from request body
        const { username, email, password, role } = req.body;

        // Validate required fields
        if (!username || !email || !password || !role) {
            return res.status(400).send({ success: false, message: 'All fields are required' });
        }

        if (role == 'Admin') {
            return res.status(400).send({ success: false, message: 'You can not access as admin' });
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

        // Handle avatar upload if file is present
        let avatar = {};
        if (req.file && req.file.avatar && req.file.avatar) {
            return res.status(400).send({ success: false, message: 'Avatar is required' });
        }

        // Handle avatar upload if file is present
        
        if (req.files && req.files.avatar && req.files.avatar[0]) {
            const result = await uploadImageOnCloudinary(req.files.avatar[0].path, 'avatars');
            avatar = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        // Create a new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            role,
            avatar
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

//login

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, message: "Please provide all fields" });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: "You haven't registered yet!" });
        }

        // Check if the password matches
        const isMatchPassword = await matchPassword(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).send({ success: false, message: "Your credentials do not match" });
        }

        // JWT token generation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRES}d` });

        // Clear the password from the user object before sending it
        user.password = undefined;

        const maxAge = (process.env.JWT_EXPIRES || 1) * 24 * 60 * 60 * 1000;
        // Set the cookie with the token and configure it to last a long time
        const cookieOptions = {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production', // Ensure secure is true only in production
            path: '/',
            expires: new Date(Date.now() + maxAge),
            maxAge,
            sameSite: 'none', 
            domain: process.env.NODE_ENV === 'production' ? 'blogsphere-github-io-1.onrender.com' : undefined // Set domain only in production
        };

        return res
            .cookie("token", token, cookieOptions)
            .status(200)
            .send({ success: true, message: 'Login successful', user, token });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
};

//logout
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

//get all user as a admin
const getAllUser = async (req, res) => {
    try {

        const users = await userModel.find({});
        if (!users) {
            return res
                .status(404)
                .send({ success: false, message: "No user Found" });
        }

        return res
            .status(200)
            .json({ total: users.length, success: true, data: users });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Internal Server Error' });
    }
}

//get all reader
const readersController = async (req, res) => {
    try {

        const readers = await userModel.find({ role: 'Reader' }).select('username').select('avatar');
        if (!readers) {
            return res
                .status(404)
                .send({ success: false, message: "No user Found" });
        }

        return res
            .status(200)
            .json({ total: readers.length, success: true, data: readers });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Internal Server Error' });
    }
}

//get all author
const authorsController = async (req, res) => {
    try {

        const authors = await userModel.find({ role: 'Author' }).select('username').select('avatar');
        if (!authors) {
            return res
                .status(404)
                .send({ success: false, message: "No user Found" });
        }
        
        return res
            .status(200)
            .json({ total: authors.length, success: true, data: authors });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Internal Server Error' });
    }
}

//get myProfile
const myProfileController = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
          }
        const userProfile = await userModel.findById(user._id).select('-password');
        if (!userProfile) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
        return res
            .status(200)
            .json({ success: true, data: userProfile });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Internal Server Error' });
    }
}


export { registerController, loginController, logoutController, getAllUser, readersController, authorsController, myProfileController };
