import {fcmTokenRepository }from '../repositories/FcmTokenRepository.js';
import admin from 'firebase-admin';

class FcmTokenController {
  async create(req, res) {
    const { userID, token } = req.body;
    const fcmToken = await fcmTokenRepository.create(userID, token);
    return res.json(fcmToken);
  }

  async delete(req, res) {
    const { userID, token } = req.body;
    await fcmTokenRepository.delete(userID, token);
    return res.json({ message: 'FcmToken deleted successfully' });
  }

  async findByToken(req, res) {
    const { token } = req.query;
    const fcmToken = await fcmTokenRepository.findByToken(token);
    return res.json(fcmToken);
  }

  async findByUserID(req, res) {
    const { userID } = req.params;
    const fcmTokens = await fcmTokenRepository.findByUserID(userID);
    return res.json(fcmTokens);
  }
  
  async sendNotificationToFCM (req, res){
    const registrationToken = req.body.registrationToken;
  
    const payload = {
      notification: {
        title: 'New message!',
        body: 'You have received a new message.'
      }
    };
  
    try {
      const response = await admin.messaging().sendToDevice(registrationToken, payload);
      console.log('Successfully sent message:', response);
      res.status(200).json({ message: 'Notification sent successfully!' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Error sending notification!' });
    }
  };
}

export default new FcmTokenController();