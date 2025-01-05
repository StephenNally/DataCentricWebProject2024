const express = require('express');
const router = express.Router();
const Lecturer = require('../myMongoDB');

// GET all lecturers
router.get('/', async (req, res) => {
  try {
    const lecturers = await Lecturer.find().sort('_id');
    res.render('lecturers', { lecturers });
  } catch (err) {
    console.error('Error fetching lecturers:', err);
    res.status(500).send('Error fetching lecturers');
  }
});

// DELETE lecturer
router.get('/delete/:lid', async (req, res) => {
  try {
    await Lecturer.deleteOne({ _id: req.params.lid });
    res.redirect('/lecturers');
  } catch (err) {
    res.status(500).send('Error deleting lecturer');
  }
});

module.exports = router;
