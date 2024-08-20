const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});

router.post('/', async (req, res) => {
    const { text } = req.body;
    if (text) {
        const newTodo = await prisma.todo.create({
            data: { text },
        });
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: 'Text is required' });
    }
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { done } = req.body;
    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { done },
    });
    res.json(updatedTodo);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.todo.delete({
        where: { id },
    });
    res.json({ message: 'Todo deleted' });
});

module.exports = router;
