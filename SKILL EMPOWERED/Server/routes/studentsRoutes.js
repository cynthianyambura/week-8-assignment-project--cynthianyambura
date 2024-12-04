const express = require('express');
const Student = require('/models/student');
const router = express.Router();

// Create a Student
router.post('/', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Students
router.get('/', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Student
router.put('/:id', async (req, res) => {
    try {
        const updated = await Student.update(req.body, { where: { StudentID: req.params.id } });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Student
router.delete('/:id', async (req, res) => {
    try {
        await Student.destroy({ where: { StudentID: req.params.id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
