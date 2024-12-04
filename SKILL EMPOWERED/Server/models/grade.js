const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Grade = sequelize.define('Grade', {
    GradeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    StudentID: { type: DataTypes.INTEGER, references: { model: Student, key: 'StudentID' } },
    ClassID: { type: DataTypes.INTEGER, references: { model: Class, key: 'ClassID' } },
    Grade: { type: DataTypes.STRING, allowNull: false },
});

module.exports =  Grade;