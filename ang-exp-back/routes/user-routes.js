
const router = require('express').Router();
const db = require('../controller/users');

router.get('/user/list', db.getUsers); // Get users
router.get('/user/:id', db.getUserById); // Get user by ID
router.post('/user', db.createUser); // Create user
router.delete('/user/:id', db.deleteUser); // Get user by ID
router.put('/user/:id', db.updateUser); // Update user by ID

module.exports = router;