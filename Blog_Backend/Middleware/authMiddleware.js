import jwt from 'jsonwebtoken';
import userModel from '../Models/userModels.js';

const isAuthorized = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({ success: false, message: "Please login to access this resource" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decodedToken.id);

        if (!req.user) {
            return res.status(401).send({ success: false, message: "User not found" });
        }

        next();
    } catch (error) {
        console.error('Authorization error:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ success: false, message: "Token expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ success: false, message: "Invalid token" });
        }

        return res.status(400).send({ success: false, message: "Error in Authorization", error });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || user.role !== "Admin") {
            return res.status(401).send({ success: false, message: "You are not authorized" });
        }

        next();
    } catch (error) {
        console.error('Admin authorization error:', error);
        return res.status(400).send({ success: false, message: "Only Admin can access this", error });
    }
}

const isAuthor = async (req, res, next) => {
    try {
        const user = req._id;
        console.log(user)
        if (!user || user.role !== "Author") {
            return res.status(401).send({ success: false, message: "You are not authorized" });
        }
        next();
    } catch (error) {
        console.error('Author authorization error:', error);
        return res.status(400).send({ success: false, message: "Only Author can access this", error });
    }
}

const checkUserAccess = (req, res, next) => {
    if (req.params.id !== req.user.id.toString()) {
      return res.status(403).send({ success: false, message: "You are not authorized to access this resource" });
    }
    next();
  };

export { isAuthorized, isAdmin, isAuthor, checkUserAccess };
