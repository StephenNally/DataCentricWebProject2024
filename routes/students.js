const express = require('express');
const router = express.Router();
const db = require('../MySqlDao');

// GET all students
router.get('/', async (req, res) => {
  try {
    const [students] = await db.query('SELECT * FROM student ORDER BY sid');
    res.render('Students', { theStudents: students });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send('Error fetching students');
  }
});

// GET add student page
router.get('/add', (req, res) => {
  res.render('add-student', { error: null });
});

// POST add student
router.post('/add', async (req, res) => {
  const { sid, name, age } = req.body;
  if (sid.length !== 4 || name.length < 2 || age < 18) {
    return res.render('add-student', { error: 'Invalid data provided' });
  }
  try {
    await db.query('INSERT INTO student (sid, name, age) VALUES (?, ?, ?)', [sid, name, age]);
    res.redirect('/students');
  } catch (err) {
    res.render('add-student', { error: 'Student ID already exists' });
  }
});

// GET edit student page
router.get('/edit/:sid', async (req, res) => {
  try {
    const [student] = await db.query('SELECT * FROM student WHERE sid = ?', [req.params.sid]);
    res.render('edit-student', { student: student[0], error: null });
  } catch (err) {
    res.status(500).send('Error fetching student');
  }
});

// POST edit student
router.post('/edit/:sid', async (req, res) => {
  const { name, age } = req.body;
  if (name.length < 2 || age < 18) {
    return res.render('edit-student', { error: 'Invalid data provided', student: { sid: req.params.sid, name, age } });
  }
  try {
    await db.query('UPDATE student SET name = ?, age = ? WHERE sid = ?', [name, age, req.params.sid]);
    res.redirect('/students');
  } catch (err) {
    res.status(500).send('Error updating student');
  }
});

module.exports = router;
