const express = require('express');
const Class = require('../models/class'); // Replace with your actual Class model
const router = express.Router();

// Create a Class
router.post('/', async (req, res) => {
    try {
        const classData = await Class.create(req.body);
        res.status(201).json(classData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Class
router.put('/:id', async (req, res) => {
    try {
        const updated = await Class.update(req.body, { where: { ClassID: req.params.id } });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Class
router.delete('/:id', async (req, res) => {
    try {
        await Class.destroy({ where: { ClassID: req.params.id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
