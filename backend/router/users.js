import express from 'express';
import { db } from '../config/database.js'

const router = express.Router();

router.post('/add_user', (req, res)=>{
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

router.post('/edit_user/:id', (req, res)=>{
  console.log('edit_user', req);
  
  const id = req.params.id;
  const sql = "UPDATE users SET `firstname`=?, `lastname`=?, `email`=? WHERE ID=?";
  const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      id
  ]

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: "User added successfully", id: result.insertId });
  });
})

router.delete("/delete_user/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE ID=?"
  const values = [id]
  db.query(sql, values, (err, result) => {
      if (err) res.json({"message": "Server error"})
      return res.json(result)
  })
})
router.get('/get_user/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users WHERE ID=?"
  const values = [id]
  db.query(sql, values, (err, result) => {
      if (err) res.json({"message": "Server error"})
      return res.json(result)
  })
})

router.get("/", (req, res) => {
  const sql = "SELECT * FROM users"
  db.query(sql, (err, result) => {
      if (err) res.json({"message": "Server error"})
      return res.json(result)
  })
})

export default router