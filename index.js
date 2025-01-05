const {getAllStudents,
    getAllGrades
} = require('./MySqlDao');

const { getLecturers} = require('./myMongoDB');

var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// Body parser for form submissions
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


// Home route
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3004, () => {
  console.log('Server running on port 3004');
});

// GET grades page
app.get('/grades', async (req, res) => {
    try {
      const grades = await getAllGrades(); 
      res.render('grades', { grades });
    } catch (err) {
      console.error('Error fetching grades:', err);
      res.status(500).send('Error fetching grades');
    }
  });

  // GET all lecturers
app.get('/lecturers', async (req, res) => {
    try {
      const lecturers = await getLecturers();
      res.render('lecturers', { lecturers });
    } catch (err) {
      console.error('Error fetching lecturers:', err);
      res.status(500).send('Error fetching lecturers');
    }
  });
  
  // DELETE lecturer
  app.get('/delete/:lid', async (req, res) => {
    try {
      await Lecturer.deleteOne({ _id: req.params.lid });
      res.redirect('/lecturers');
    } catch (err) {
      res.status(500).send('Error deleting lecturer');
    }
  });

  // GET all students
app.get('/students', async (req, res) => {
    try {
      const students = await getAllStudents(); // Call the new method
      res.render('Students', { theStudents: students });
    } catch (err) {
      console.error('Error fetching students:', err);
      res.status(500).send('Error fetching students');
    }
  });
  
  // Add a student
  app.post('/add', async (req, res) => {
    const { sid, name, age } = req.body;
    try {
      await db.addStudent(sid, name, age); // Call the addStudent method
      res.redirect('/students');
    } catch (err) {
      console.error('Error adding student:', err);
      res.status(500).send('Error adding student');
    }
  });