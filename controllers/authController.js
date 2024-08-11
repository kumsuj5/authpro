const User = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
    const { username, email, password, phone, gender, userType } = req.body;

    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with the hashed password
        const user = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            gender,
            userType
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' ,user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            userType: user.userType,
           
        }});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Received email:', email);
    console.log('Received password:', password);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, userType: user.userType },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        // res.status(200).json({ token });
        res.status(200).json({  user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            userType: user.userType,
            token
        }});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
