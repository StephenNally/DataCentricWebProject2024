const pmysql = require('promise-mysql');
let pool;

// Create a connection pool
pmysql.createPool({
  connectionLimit: 1,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'proj2024mysql',
})
  .then((p) => {
    pool = p;
    console.log('MySQL connection pool created successfully.');
  })
  .catch((e) => {
    console.error('Error creating MySQL connection pool:', e);
  });


  // Fetch all students
  const getAllStudents = async () => {
    try {
      const students = await pool.query('SELECT * FROM student ORDER BY sid');
      return students;
    } catch (err) {
      console.error('Error fetching students:', err);
      throw err;
    }
  };

  // Fetch a specific student by ID
  const getStudentById = async (sid) => {
    try {
      const student = await pool.query('SELECT * FROM student WHERE sid = ?', [sid]);
      return student[0]; // Return the first (and only) result
    } catch (err) {
      console.error(`Error fetching student with ID ${sid}:`, err);
      throw err;
    }
  };

  // Add a new student
  const addStudent = async (sid, name, age) => {
    try {
      const result = await pool.query('INSERT INTO student (sid, name, age) VALUES (?, ?, ?)', [sid, name, age]);
      return result;
    } catch (err) {
      console.error('Error adding student:', err);
      throw err;
    }
  };

  // Update an existing student
  const updateStudent = async (sid, name, age) => {
    try {
      const result = await pool.query('UPDATE student SET name = ?, age = ? WHERE sid = ?', [name, age, sid]);
      return result;
    } catch (err) {
      console.error(`Error updating student with ID ${sid}:`, err);
      throw err;
    }
  };

  // Delete a student by ID
  const deleteStudent = async (sid) => {
    try {
      const result = await pool.query('DELETE FROM student WHERE sid = ?', [sid]);
      return result;
    } catch (err) {
      console.error(`Error deleting student with ID ${sid}:`, err);
      throw err;
    }
  };

  // Fetch grades for all students
  const getAllGrades = async () => {
    try {
      const grades = await pool.query(`
        SELECT s.name AS studentName, m.name AS moduleName, g.grade
        FROM grade g
        JOIN student s ON g.sid = s.sid
        JOIN module m ON g.mid = m.mid
        ORDER BY s.name, g.grade;
      `);
      return grades;
    } catch (err) {
      console.error('Error fetching grades:', err);
      throw err;
    }
  };

  // Fetch modules taught by a specific lecturer
  const getModulesByLecturer = async (lecturerId) => {
    try {
      const modules = await pool.query('SELECT * FROM module WHERE lecturer = ?', [lecturerId]);
      return modules;
    } catch (err) {
      console.error(`Error fetching modules for lecturer ${lecturerId}:`, err);
      throw err;
    }
  };


module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    getAllGrades,
    getModulesByLecturer,
  };