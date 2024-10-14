const express = require('express');
const router = express.Router();

// Controller 설정
const model1Controller = require('../controllers/Model1controller');

// /ai/model1 경로에 대한 GET 요청 처리
router.post('/model1', model1Controller.handleModel1Request);

module.exports = router;
