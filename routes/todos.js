"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo added successfully', todo: newTodo });
});
router.post('/deletetodo/:todoId', (req, res, next) => {
    todos = todos.filter((todoItem) => todoItem.id != req.params.todoId);
    res.status(200).json({ message: 'Todo deleted successfully' });
});
router.post('/updatetodo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        res.status(200).json({ message: 'Todo updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
exports.default = router;
