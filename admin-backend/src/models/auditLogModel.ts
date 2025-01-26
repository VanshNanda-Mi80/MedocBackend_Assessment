import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('AuditLog', auditLogSchema);
