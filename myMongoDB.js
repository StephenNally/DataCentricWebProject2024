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

//method for getting all the lecturers
const getLecturers = async () => {
    try {
      return await Lecturer.find({}).sort({ _id: 1 });
    } catch (err) {
      console.error("Error fetching lecturers:", err);
      throw err;
    }
  };

  //method for getting all the lecturers
const deleteLecturersById = async (_id) => {
    try {
      const results = await Lecturer.findByIdAndDelete(_id);
      return results;
    } catch (err) {
      console.error("Error fetching lecturers:", err);
      throw err;
    }
  };



  module.exports = {
    getLecturers,
    deleteLecturersById,
  };
