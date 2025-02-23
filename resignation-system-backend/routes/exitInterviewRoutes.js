

const express = require('express');
const { submitExitInterview, getAllExitInterviews } = require('../controllers/exitInterviewController');
const { auth, isHR } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/user/responses', auth, submitExitInterview); 
router.get('/admin/exit_responses', auth, isHR, getAllExitInterviews); 

module.exports = router;
