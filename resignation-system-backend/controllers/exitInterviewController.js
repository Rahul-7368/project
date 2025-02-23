const { sendEmail } = require('../utils/emailService');
const ExitInterview = require('../models/ExitInterview');
// const User = require('../models/User');


exports.sendExitInterviewEmail = async (employeeEmail, employeeName) => {
    try{
    const exitInterviewLink = 'http://localhost:5173/'; // Update with actual frontend URL

    const emailMessage = `Dear ${employeeName},\n\n
    Please complete your exit interview at the following link:\n${exitInterviewLink}\n\n
    Thank you for your time with us.`;

    await sendEmail(employeeEmail, 'Exit Interview Form', emailMessage);
} catch(error) {
    console.error("Error sending exit interview email:", error);
}
}

exports.submitExitInterview = async (req, res) => {
    try {
        const { responses } = req.body;
        const employeeId = req.user.id; 

        const exitInterview = new ExitInterview({ employeeId, responses });
        await exitInterview.save();

        res.status(201).json({ message: 'Exit interview submitted successfully', exitInterview });
    } catch (error) {
        console.error(" Error submitting exit interview:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllExitInterviews = async (req, res) => {
    try {
        const exitInterviews = await ExitInterview.find().populate('employeeId', 'username');
        res.json({ exitInterviews });
    } catch (error) {
        console.error("Error fetching exit interviews:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
