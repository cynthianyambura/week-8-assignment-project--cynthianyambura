const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Attendance = sequelize.define('Attendance', {
    AttendanceID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    StudentID: { type: DataTypes.INTEGER, references: { model: Student, key: 'StudentID' } },
    ClassID: { type: DataTypes.INTEGER, references: { model: Class, key: 'ClassID' } },
    Date: { type: DataTypes.DATE, allowNull: false },
    Status: { type: DataTypes.ENUM('Present', 'Absent'), allowNull: false },
});
module.exports = Attendance;