const path = require('path');
const User = require('../module/userSchema.js')
const indexPath = path.resolve(__dirname, '../pages/index.html');
const errorPath = path.resolve(__dirname, '../pages/error.html');
const successPath = path.resolve(__dirname, '../pages/success.html');

exports.home = (req, res) => {
  res.sendFile(indexPath);
};

exports.createUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error("Name, email, and password are required");
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            // User already exists, send error response
            return res.sendFile(errorPath);
        }

        // User does not exist, create a new user
        const newUser = await User.create({
            name,
            email,
            password,
        });

        // Send success response
        return res.sendFile(successPath);
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

