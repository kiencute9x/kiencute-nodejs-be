import mongoose from 'mongoose';

const FcmTokenSchema = new mongoose.Schema({
  userID: { type: mongoose.Types.ObjectId, required: true },
  token: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.model('FcmToken', FcmTokenSchema);