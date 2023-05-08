import express from 'express';
import fcmTokenController from '../controllers/fcmController.js'

const router = express.Router();

router.post('/', fcmTokenController.create);
router.delete('/', fcmTokenController.delete);
router.get('/', fcmTokenController.findByToken);
router.get('/:userID', fcmTokenController.findByUserID);
router.post('/send-fcm', fcmTokenController.sendNotificationToFCM);

export default router;