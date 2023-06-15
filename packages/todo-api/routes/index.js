import express from "express";
const router = express.Router();

router.get('/meta', (req, res) => {
  res.send({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  })
})

export default router;