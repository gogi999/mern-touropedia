import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            const googleId = decodedData?.sub.toString();
            const user = await User.findOne({ googleId });
            req.userId = user?._id;
        }
        
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;
