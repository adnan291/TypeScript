"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo added successfully', todo: newTodo });
});
router.post('/deletetodo/:todoId', (req, res, next) => {
    const params = req.params;
    const tid = params.todoId;
    const initialLength = todos.length;
    todos = todos.filter((todoItem) => todoItem.id !== tid);
    if (todos.length < initialLength) {
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
router.post('/updatetodo/:todoId', (req, res, next) => {
    const params = req.params;
    const tid = params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        res.status(200).json({ message: 'Todo updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
exports.default = router;
