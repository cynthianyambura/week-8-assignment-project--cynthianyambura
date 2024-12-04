const express = require('express');
const Grade = require('../models/grade'); // Replace with your actual Grade model
const router = express.Router();

// Create a Grade
router.post('/', async (req, res) => {
    try {
        const grade = await Grade.create(req.body);
        res.status(201).json(grade);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Grades
router.get('/', async (req, res) => {
    try {
        const grades = await Grade.findAll();
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Grade
router.put('/:id', async (req, res) => {
    try {
        const updated = await Grade.update(req.body, { where: { GradeID: req.params.id } });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Grade
router.delete('/:id', async (req, res) => {
    try {
        await Grade.destroy({ where: { GradeID: req.params.id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
