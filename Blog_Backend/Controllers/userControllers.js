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

//Login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all fields' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not registered' });
        }

        const isMatchPassword = await matchPassword(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        user.refreshToken = refreshToken;
        await user.save();

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Refresh token expiration
            sameSite: 'None',
        };

        res.cookie('token', token, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);

        return res.status(200).json({ success: true, message: 'Login successful', user, token, refreshToken });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};


//RefreshToken
const refreshTokenController = async (req, res) => {
    try {
        const cookies = req.headers.cookie;
        if (!cookies) {
            return res.status(400).json({ message: "Couldn't find token" });
        }

        const prevToken = cookies.split('refreshToken=')[1];
        if (!prevToken) {
            return res.status(400).json({ message: "Couldn't find token" });
        }

        jwt.verify(prevToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(403).json({ message: 'Authentication failed' });
            }

            const user = await userModel.findById(decoded.id);
            if (!user || user.refreshToken !== prevToken) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d', // Short expiration
            });
            const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
                expiresIn: '7d', // Longer expiration
            });

            user.refreshToken = newRefreshToken;
            await user.save();

            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Refresh token expiration
                sameSite: 'None',
            };


            res.cookie('refreshToken', newRefreshToken, cookieOptions);
            res.cookie('token', newToken, {
                path: '/',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Access token expiration
                httpOnly: true,
                sameSite: 'Lax',
            });

            return res.status(200).json({ success: true, message: 'Token refreshed', token: newToken, refreshToken: newRefreshToken });
        });
    } catch (error) {
        console.error('Error during refresh token:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



//logout
const logoutController = (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production'
        });

        res.cookie('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
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


export { registerController, loginController, logoutController, getAllUser, readersController, authorsController, myProfileController, refreshTokenController };
