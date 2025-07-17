import bcrypt from 'bcrypt';
import Farmer from '../models/farmers.model.js';
import Expert from '../models/experts.model.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const user = await Farmer.findOne({fname: username });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.pass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const explogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const user = await Expert.findOne({ fname:username });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.pass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await Farmer.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new Farmer({ fname:username, femail:email, pass: hashedPassword });
        //console.log(newUser)
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

export const expsignup = async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await Expert.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user to database
        const newUser = new Expert({ fname:username, femail:email, pass: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}
export const forgotpassword = async (req, res) => {
    const { identifier, newPassword } = req.body; // Identifier can be either email or username
    console.log("hello ", identifier);
    try {
        // Find user by email or username
        const user = await Farmer.findOne({ $or: [{ femail: identifier }, { fname: identifier }] });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Update the password if a new password is provided
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.pass = hashedPassword;
        await user.save();
        return res.status(200).json({ message: 'Password reset successfully. You can now log in with your new password.' });

    } catch (error) {
        res.status(500).json({ message: 'Error handling password reset. Please try again later.', error });
    }
}

export const expforgotPassword = async (req, res) => {
    const { identifier, newPassword } = req.body; // Identifier can be either email or username
    try {
        // Find user by email or username
        const user = await Expert.findOne({ $or: [{ femail: identifier }, { fname: identifier }] });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Update the password if a new password is provided
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.pass = hashedPassword;
        await user.save();
        return res.status(200).json({ message: 'Password reset successfully. You can now log in with your new password.' });

    } catch (error) {
        res.status(500).json({ message: 'Error handling password reset. Please try again later.', error });
    }
}