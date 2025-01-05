const mongoose = require('mongoose');

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/proj2024MongoDB';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Lecturer schema
const LecturerSchema = new mongoose.Schema({
  _id: String,
  name: String,
  did: String,
});

const Lecturer = mongoose.model('lecturers', LecturerSchema);

module.exports = Lecturer;
