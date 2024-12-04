const express = require('express');
const Teacher = require('../models/teacher'); // Replace with your actual Teacher model
const router = express.Router();

// Create a Teacher
router.post('/', async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).json(teacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Teacher
router.put('/:id', async (req, res) => {
    try {
        const updated = await Teacher.update(req.body, { where: { TeacherID: req.params.id } });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Teacher
router.delete('/:id', async (req, res) => {
    try {
        await Teacher.destroy({ where: { TeacherID: req.params.id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
