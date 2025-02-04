import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123',
    database: 'blog_post',
});

app.post('/add_user', (req, res)=>{
    const sql = "INSERT INTO users (`firstname`, `lastname`, `email`) VALUES (?, ?, ?)";
    console.log('req', req.body);
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

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})