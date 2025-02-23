const Resignation = require("../models/Resignation");
const User = require("../models/User");
// const nodemailer = require('../utils/emailService');
const { sendEmail } = require("../utils/emailService");

exports.submitResignation = async (req, res) => {
  try {
    const { lwd } = req.body;
    const employeeId = req.user.id;

    console.log(`Resignation request submitted by user: ${employeeId}`);

    const resignation = new Resignation({ employeeId, lwd, status: "pending" });
    await resignation.save();

    const hrEmail = "hr@company.com"; // Replace with actual HR email
    const emailMessage = `New resignation request from Employee ID: ${employeeId}. Last Working Day: ${lwd}`;
    await sendEmail(hrEmail, "New Resignation Request", emailMessage);

    res
      .status(201)
      .json({ message: "Resignation submitted successfully", resignation });

    // if(req.user.role !== 'Employee') return res.status(403).json({ message: 'Access denied'});

    // const resignation = new Resignation({
    // employeeId: req.user.id,
    // lwd: req.body.lwd,
  } catch (error) {
    console.error("Error submitting resignation:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllResignations = async (req, res) => {
  try {
    // if(req.user.role !== 'HR') return res.status(403).json({message: 'Access denied'});

    const resignations = await Resignation.find().populate(
      "employeeId",
      "username"
    );
    res.json({ resignations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.concludeResignation = async (req, res) => {
  try {
    const resignationId = req.params.id;
    const { approved, lwd } = req.body;

    const resignation = await Resignation.findById(resignationId).populate(
      "employeeId"
    );
    if (!resignation) {
      return res.status(404).json({ message: "Resignation not found" });
    }
    resignation.status = approved ? "approved" : "rejected";
    resignation.lwd = approved ? lwd : resignation.lwd;
    await resignation.save();

    const emailMessage = approved
      ? `Dear ${resignation.employeeId.username}, your resignation has been approved. Your last working day is ${lwd}.`
      : `Dear ${resignation.employeeId.username}, your resignation has been rejected. Please contact HR for more details.`;

    await sendEmail(
      resignation.employeeId.email,
      "Resignation Status Update",
      emailMessage
    );

    res.json({
      message: `Resignation ${
        approved ? "approved" : "rejected"
      } successfully.`,
    });

    // const employee = await User.findById(resignation.employeeId);
    // await nodemailer.sendMail({
    //     to: employee.username,
    //     subject: 'Resignation update',
    //     text: `Your resignation has been ${resignation.status}. Last working day: ${resignation.lwd}`
    // });
    // res.json({ message: `Resignation ${resignation.status}`, resignation});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
  // if(req.user.role !== 'HR') return res.status(403).json({ message: 'Access denied' });

  // await Resignation.findByIdAndUpdate(req.body.resignationId, {
  //     status: req.body.approved ? 'approved' : 'rejected',
  //     lwd: req.body.lwd
  // });
  // res.json({ message: 'Resignation status updated' });
};
