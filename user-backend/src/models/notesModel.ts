import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Note', notesSchema);
