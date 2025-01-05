const express = require('express');
const router = express.Router();
const db = require('../MySqlDao');

// GET Students Page
router.get('/', async (req, res) => {
  try {
    const [students] = await db.query('SELECT * FROM student ORDER BY sid');
    res.render('Students', { theStudents: students });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send('Error fetching students');
  }
});

module.exports = router;
