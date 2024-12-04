const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Student = sequelize.define('Student', {
    StudentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    DOB: { type: DataTypes.DATE, allowNull: false },
    ContactInfo: { type: DataTypes.STRING },
    EnrollmentDate: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Student;
