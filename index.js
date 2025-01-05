var express = require('express');
var app = express();
var studentsRoutes = require('./routes/students');
var lecturersRoutes = require('./routes/lecturers');
var gradesRoutes = require('./routes/grades');

app.set('view engine', 'ejs');

// Body parser for form submissions
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/students', studentsRoutes);
app.use('/lecturers', lecturersRoutes);
app.use('/grades', gradesRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3004, () => {
  console.log('Server running on port 3004');
});
