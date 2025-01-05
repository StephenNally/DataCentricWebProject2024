const express = require('express');
const router = express.Router();
const Lecturer = require('../myMongoDB');

// GET Lecturers Page
router.get('/', async (req, res) => {
  try {
    const lecturers = await Lecturer.find().sort('_id');
    res.render('lecturers', { lecturers });
  } catch (err) {
    console.error('Error fetching lecturers:', err);
    res.status(500).send('Error fetching lecturers');
  }
});

module.exports = router;
