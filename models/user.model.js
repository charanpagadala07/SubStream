import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'UserName is required'],
        trim: true,
        minLength:3,
        maxLength:50,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        minLength:3,
        maxLength:55,
        match:[/\S+@\S+\.\S+/,'Please enter a valid email address'],
        lowercase:true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength:3,
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;