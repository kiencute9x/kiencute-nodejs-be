import FcmToken from '../models/FcmToken.js';

export const fcmTokenRepository = {
  async create(userID, token) {
    const fcmToken = new FcmToken({ userID, token });
    await fcmToken.save();
    return fcmToken;
  },
  async delete(userID, token) {
    await FcmToken.deleteOne({ userID, token });
  },
  async findByToken(token) {
    return FcmToken.findOne({ token });
  },

  async findByUserID(userID) {
    return FcmToken.find({ userID });
  }

}

