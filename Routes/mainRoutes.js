const express = require('express');
// const AuthController = require(); // Auth Controller
const router = express.Router();
const { check } = require('express-validator');
const mainController = require('../Controllers/mainController');


router.get('/', mainController.getIndex);




    module.exports = router;