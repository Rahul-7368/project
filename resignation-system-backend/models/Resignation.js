
const mongoose = require('mongoose');

const ResignationSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lwd: { type: Date, required: true },
    status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' }
}, { timeStamps: true });

module.exports = mongoose.model('Resignation', ResignationSchema);