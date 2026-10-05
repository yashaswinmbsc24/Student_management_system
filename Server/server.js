const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 5001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students'
});

// Database connection
db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        console.log('Database connected');
    }
});

// ADD STUDENT
app.post('/add_user', (req, res) => {

    const sql = `
        INSERT INTO student_details (name, email, age, gender)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error adding student'
            });
        }

        return res.json({
            message: 'Student added successfully'
        });
    });
});

// GET ALL STUDENTS
app.get('/users', (req, res) => {

    const sql = 'SELECT * FROM student_details';

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error getting students'
            });
        }

        return res.json(result);
    });
});

// GET ONE STUDENT
app.get('/user/:id', (req, res) => {

    const sql = 'SELECT * FROM student_details WHERE id = ?';

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error getting student'
            });
        }

        return res.json(result);
    });
});

// UPDATE STUDENT
app.put('/update_user/:id', (req, res) => {

    const sql = `
        UPDATE student_details
        SET name = ?, email = ?, age = ?, gender = ?
        WHERE id = ?
    `;

    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        req.params.id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error updating student'
            });
        }

        return res.json({
            message: 'Student updated successfully'
        });
    });
});

// DELETE STUDENT
app.delete('/delete_user/:id', (req, res) => {

    const sql = 'DELETE FROM student_details WHERE id = ?';

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error deleting student'
            });
        }

        return res.json({
            message: 'Student deleted successfully'
        });
    });
});

// START SERVER
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});