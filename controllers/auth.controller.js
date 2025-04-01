import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";
import User from '../models/user.model.js';

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            const error = new Error('User already exists');
            res.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name, email, password:hashedpassword}], {session});

        const token = jwt.sign({userId: newUsers[0]._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});


        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({
            success: true,
            message: 'User Created successfully',
            data:{
                token,
                user: newUsers[0],
            }
        })
    } catch (error) {
        session.abortTransaction();
        session.endSession();
        return res.status(401).json({error: error.message});
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if (!user) {
            const error = new Error('invalid user credentials');
            res.statusCode = 409;
            throw error;
        }

        const passwordisValid = await bcrypt.compare(password, user.password);

        if(!passwordisValid) {
            const error = new Error('Invalid Password');
            res.statusCode = 409;
            throw error;
        }

        const token = jwt.sign({userId:user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        return res.status(200).json({
            success: true,
            message:'Signed In Successfully',
            data:{
                token,
                user,
            }
        });

    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {

};

