const Pool = require('pg').Pool;
require('dotenv').config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Get users
const getUsers = (req, rep) => {
  pool.query('SELECT * FROM users ORDER BY name ASC', (error, results) => { //  ORDER BY id ASC
    if (error) {
      throw error;
    }
    // rep.render('layout', { title: 'Users list' , users: results.rows });
    return rep.json(results.rows);
  });
};


// Get users by id
const getUserById = (req, rep) => {
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) { throw error; }
    rep.status(200).json(results.rows);
  });
};

// Create new user
const createUser = (req, rep) => {
  const { name, email, phone } = req.body;

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2, $3)', [name, email, phone], (error, results) => {
    if (error) {
      throw error;
    }
    rep.status(201).send(`User added with ID: ${results.insertId}`);
  });
};

// Delete user by id

const deleteUser = async (req, rep) => {
  console.log('delete')
  const id = req.params.id;
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) { throw error; }
    rep.status(200).send(`User deleted with ID: ${id}`);
  });
};

// Update user
const updateUser = (req, rep) => {
  const id = req.params.id;
  const {name, email, phone} = req.body;

  pool.query(
    'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4 WHERE id = $5',
    [name, email, phone, id],
    (error) => {
      if (error) { throw error; }
      rep.status(200).send(`User modified with ID: ${id}`);
    }
  );
};


module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};