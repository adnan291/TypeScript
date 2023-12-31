import {Router} from 'express';
import bodyParser from 'body-parser';

import {Todo} from '../models/todo';

type RequestBody  = { text: string };
type RequestParams  = { todoId: string };

let todos : Todo[]= [];

const router = Router();

router.get('/', (req, res, next) => {
res.status(200).json({ todos : todos})
});

router.post('/todo', (req, res, next)=> {

  const body = req.body as RequestBody;

    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };

    todos.push(newTodo);
    res.status(201).json({ message: 'Todo added successfully', todo: newTodo });
});

router.post('/deletetodo/:todoId', (req, res, next)=> {
  const params = req.params as RequestParams;
    const tid = params.todoId;
    const initialLength = todos.length;
    todos = todos.filter((todoItem) => todoItem.id !== tid);
  
    if (todos.length < initialLength) {
      res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  });

router.post('/updatetodo/:todoId', (req, res, next)=> {
  const params = req.params as RequestParams;
   const tid = params.todoId;
  const body = req.body as RequestBody;

   const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
   if (todoIndex >= 0) {
    todos[todoIndex] = {id : todos[todoIndex].id, text: body.text}
    res.status(200).json({ message: 'Todo updated successfully' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

export default router;