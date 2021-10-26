const express = require ('express');
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware')
const{addNotification,getNotificationController} = require ('../controllers/notificationController')

router.post('/addNotification',authMiddleware,addNotification)

router.get('/listNotifications',authMiddleware,getNotificationController)




module.exports = router;