const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.find();
        res.status(200).send({
            userCount: users.length,
            success: true,
            message: "All Users Data",
            users

        })

    } catch (err) {
        res.status(401).send({
            success: false,
            message: "Error to Get Users",
            err
        })
    }

}


exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Fill All Fields"
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(200).send({
            success: true,
            message: "New User Created",
            user
        })

    } catch (err) {
        res.status(500).send({
            message: "Register Error",
            success: false,
            err
        });
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Wrong Credentials"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Email does not exists"
            })
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Wrong Password"
            })
        }

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user
        })

    } catch (err) {
        res.status(500).send({
            message: "Login Error",
            success: false,
            err
        });
    }
}

