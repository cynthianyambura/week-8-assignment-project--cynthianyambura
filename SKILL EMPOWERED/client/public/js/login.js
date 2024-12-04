const { Sequelize } = require('sequelize');
const mysql2 = new mysql2('skill_empowered', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Connection error:', err)); server.js, // Import necessary libraries
 express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Database Connection
const sequelize = new Sequelize('skill-empowered', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define Models
const Student = sequelize.define('Student', {
    StudentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    DOB: { type: DataTypes.DATE, allowNull: false },
    ContactInfo: { type: DataTypes.STRING },
    EnrollmentDate: { type: DataTypes.DATE, allowNull: false }
});

const Teacher = sequelize.define('Teacher', {
    TeacherID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    ContactInfo: { type: DataTypes.STRING },
    SubjectSpecialty: { type: DataTypes.STRING }
});

const Class = sequelize.define('Class', {
    ClassID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ClassName: { type: DataTypes.STRING, allowNull: false },
    ClassDescription: { type: DataTypes.TEXT },
    TeacherID: { type: DataTypes.INTEGER, references: { model: Teacher, key: 'TeacherID' } }
});

const Grade = sequelize.define('Grade', {
    GradeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    StudentID: { type: DataTypes.INTEGER, references: { model: Student, key: 'StudentID' } },
    ClassID: { type: DataTypes.INTEGER, references: { model: Class, key: 'ClassID' } },
    Grade: { type: DataTypes.STRING, allowNull: false }
});

const Attendance = sequelize.define('Attendance', {
    AttendanceID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    StudentID: { type: DataTypes.INTEGER, references: { model: Student, key: 'StudentID' } },
    ClassID: { type: DataTypes.INTEGER, references: { model: Class, key: 'ClassID' } },
    Date: { type: DataTypes.DATE, allowNull: false },
    Status: { type: DataTypes.ENUM('Present', 'Absent'), allowNull: false }
});

// Relationships
Class.belongsTo(Teacher, { foreignKey: 'TeacherID' });
Grade.belongsTo(Student, { foreignKey: 'StudentID' });
Grade.belongsTo(Class, { foreignKey: 'ClassID' });
Attendance.belongsTo(Student, { foreignKey: 'StudentID' });
Attendance.belongsTo(Class, { foreignKey: 'ClassID' });

// Sync Database
sequelize.sync().then(() => console.log('Database synced!')).catch(err => console.error(err));

// Routes
// Add Student
app.post('/students', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Student
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.update(req.body, {
            where: { StudentID: req.params.id }
        });
        res.status(200).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Student
app.delete('/students/:id', async (req, res) => {
    try {
        await Student.destroy({ where: { StudentID: req.params.id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Frontend Integration

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start Server
app.listen(3306, () => console.log('Server running on port 3306')); login
