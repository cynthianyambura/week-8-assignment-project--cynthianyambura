const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Teacher = sequelize.define('Teacher', {
    TeacherID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    ContactInfo: { type: DataTypes.STRING },
    SubjectSpecialty: { type: DataTypes.STRING },
});

module.exports = Teacher;

