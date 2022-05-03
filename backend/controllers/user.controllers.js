import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists!' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign(
            { email: result.email, id: result._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        res.status(201).json({ result, token });
    } catch (err) {
        res.status(500).json({ 
            message: 'Something went wrong!' 
        });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ 
                message: 'User does not exist!' 
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({
            message: 'Invalid credentials!'
        });

        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            result: existingUser,
            token
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Something went wrong!' 
        });
    }
}

export const googleSignIn = async (req, res) => {
    const { email, name, token, googleId } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const result = { 
                _id: existingUser._id.toString(),
                email,
                name 
            }
            return res.status(200).json({
                result,
                token 
            });
        }

        const result = await User.create({
            email,
            name,
            googleId
        });

        res.status(200).json({
            result,
            token
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Something went wrong!' 
        });
    }
}
