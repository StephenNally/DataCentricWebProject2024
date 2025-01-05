var express = require('express');
var app = express();
var studentsRoutes = require('./routes/students');
var lecturersRoutes = require('./routes/lecturers');
var gradesRoutes = require('./routes/grades');

app.set('view engine', 'ejs');

// Routes
app.use('/students', studentsRoutes);
app.use('/lecturers', lecturersRoutes);
app.use('/grades', gradesRoutes);

app.listen(3004, () => {
  console.log('Server running on port 3004');
});
