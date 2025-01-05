var express = require('express');
var app = express();
var studentsRoutes = require('./routes/students');
var lecturersRoutes = require('./routes/lecturers');

app.set('view engine', 'ejs');

// Routes
app.use('/students', studentsRoutes);
app.use('/lecturers', lecturersRoutes);

app.listen(3004, () => {
  console.log('Server running on port 3004');
});
