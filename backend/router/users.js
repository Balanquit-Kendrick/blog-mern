import express from 'express';
import { db } from '../config/database.js'

const app = express.Router();

app.post('/add_user', (req, res)=>{
  const sql = "INSERT INTO users (`firstname`, `lastname`, `email`) VALUES (?, ?, ?)";
  const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.email
  ]

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: "User added successfully", id: result.insertId });
  });
})

app.get("/", (req, res) => {
  const sql = "SELECT * FROM users"
  db.query(sql, (err, result) => {
      if (err) res.json({"message": "Server error"})
      return res.json(result)
  })
})

export default app