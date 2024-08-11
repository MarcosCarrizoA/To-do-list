const express = require('express');
const router = express.Router();
let todos = [];

router.get('/', (req, res) => {
    res.json(todos);
});

router.post('/', (req, res) => {
    const { text } = req.body;
    if (text) {
        const newTodo = { id: Date.now(), text, done: false };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: 'Text is required' });
    }
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { done } = req.body;
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, done } : todo
    );
    res.json({ message: 'Todo updated' });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: 'Todo deleted' });
});

module.exports = router;
