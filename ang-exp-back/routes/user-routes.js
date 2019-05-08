
const router = require('express').Router();
const db = require('../controller/users');

router.get('/users', db.getUsers); // Get users
router.get('/user/:id', db.getUserById); // Get user by ID
router.post('/user/new', db.createUser); // Create user
router.delete('/user/:id', db.deleteUser); // Get user by ID
router.put('/user/edit/:id', db.updateUser); // Update user by ID

module.exports = router;