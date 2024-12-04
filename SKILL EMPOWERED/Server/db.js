const { Sequelize } = require('sequelize');



// Create a Sequelize instance
const database= process.env.DB_NAME
const username = process.env.DB_USERNAME
const password =process.env.DB_PASSWORD
const host = process.env.DB_HOST

const db= process.env.DB_NAME
database =db.toString()
console.log(database)


const sequelize = new Sequelize('skill_empowered', 'root', 'One2345678!', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});


// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully! 🎉'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Export the Sequelize instance for use in other files
module.exports = sequelize;