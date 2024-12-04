const express = require('express');
const Attendance = require('/models/attendance'); // Replace with your actual Attendance model
const router = express.Router();

// Create an Attendance Record
router.post('/', async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);
        res.status(201).json(attendance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Attendance Records
router.get('/', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.findAll();
        res.status(200).json(attendanceRecords);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an Attendance Record
router.put('/:id', async (req, res) => {
    try {
        const updated = await Attendance.update(req.body, { where: { AttendanceID: req.params.id } });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an Attendance Record
router.delete('/:id', async (req, res) => {
    try {
        await Attendance.destroy({ where: { AttendanceID: req.params.id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
