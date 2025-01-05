const mongoose = require('mongoose');

//27017 for a local connection
const mongoURI = 'mongodb://localhost:27017/proj2024MongoDB';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


// Define Schema
const LecturerSchema = new mongoose.Schema({
    _id: String,
    name: String,
    did: String,
});

//Collection name
const Lecturer = mongoose.model('lecturers', LecturerSchema);