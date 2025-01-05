const express = require('express');
const router = express.Router();
const db = require('../MySqlDao');

// GET grades page
router.get('/', async (req, res) => {
  try {
    const [grades] = await db.query(`
      SELECT s.name AS studentName, m.name AS moduleName, g.grade
      FROM grade g
      JOIN student s ON g.sid = s.sid
      JOIN module m ON g.mid = m.mid
      ORDER BY s.name, g.grade;
    `);
    res.render('grades', { grades });
  } catch (err) {
    console.error('Error fetching grades:', err);
    res.status(500).send('Error fetching grades');
  }
});

module.exports = router;
