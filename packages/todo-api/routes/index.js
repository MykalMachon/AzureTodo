import express from "express";
const router = express.Router();

import database from '../services/database.js';

router.get('/meta', (req, res) => {
  console.log(res.locals.user);
  res.send({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    user: req.user
  })
})

// user routes 
// don't need any right now.

// to-do routes
router.get('/todos', async (req, res) => {
  const todos = await database.getTodoItemsByUser(req.user.userId);
  res.status(200).json(todos);
})

router.post('/todos', async (req, res) => {
  const todos = await database.saveTodoItem({ userId: req.user.userId, ...req.body });
  res.status(201).json(todos);
})

router.put('/todos/:id', async (req, res) => {
  const todos = await database.saveTodoItem({ userId: req.user.userId, ...req.body });
  res.status(200).json(todos)
})

router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  // get todo item by id
  const todoItem = await database.getTodoItemById(id, req.user.userId);
  if (todoItem) {
    console.log('found todo item', todoItem)
    if (req.user.userId !== todoItem.userId) {
      console.log('user has incorrect perms')
      return res.status(403).json({ message: 'Not allowed to delete this item' })
    } else {
      console.log('user has correct perms. deleting...')
      await database.deleteTodoItem(id, req.user.userId);
      return res.status(200).json({ message: 'OK' })
    }
  } else {
    return res.status(404).json({ message: 'Not found' })
  }
})

// settings routes

export default router;