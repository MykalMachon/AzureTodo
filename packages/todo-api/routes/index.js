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

// settings routes

export default router;