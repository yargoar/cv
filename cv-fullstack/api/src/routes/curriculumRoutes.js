const express = require('express');
const curriculumController = require('../controllers/curriculumController');

const router = express.Router();

router.get('/:lang', curriculumController.getCurriculumByLang);

module.exports = router;
