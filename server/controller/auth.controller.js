const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName
            }
        });

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });

    } catch (error) {
        console.error("Register Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    register,
    login
};
