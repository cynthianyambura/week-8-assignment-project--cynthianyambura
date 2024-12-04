const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// Database Connection
const sequelize = new Sequelize('skill_empowered', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

// Define User Model
const User = sequelize.define('User', {
    UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Username: { type: DataTypes.STRING, allowNull: false, unique: true },
    Email: { type: DataTypes.STRING, allowNull: false, unique: true },
    Password: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: false, // Disable timestamps if not needed
});

// Sync Database
sequelize.sync()
    .then(() => console.log('User table created!'))
    .catch(err => console.error('Error syncing database:', err));

// User Registration Endpoint
app.post('/register', async (req, res) => {
    const { Username, Email, Password } = req.body;

    try {
        // Validate input
        if (!Username || !Email || !Password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { Email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create new user
        const newUser = await User.create({ Username, Email, Password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(3306, () => console.log('Register server running on port 3306'));
