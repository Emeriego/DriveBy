const passport = require('passport');
const express = require('express');
const router = express.Router();
const {  
    getAllMessages,
    createMessage,
    getReceivedMessages,
    getUnreadMessages,
    markAsRead,
    deleteMessage,
    deleteAllMessages,
    deleteAllSentMessages,
    getUserMessages,
    getUserSentMessages 
}  = require('../controller/messageController');












router.get('/api/messages/', getAllMessages);
router.post('/api/messages/create/', passport.authenticate('bearer', { session: false }), createMessage);

router.get('/api/messages/sent/', passport.authenticate('bearer', { session: false }), getUserSentMessages);
router.get('/api/messages/', passport.authenticate('bearer', { session: false }), getReceivedMessages);
// router.get('/unread', getUnreadMessages);
// router.put('/markAsRead/:id', markAsRead);
// router.delete('/delete/:id', deleteMessage);
// router.delete('/deleteAll', deleteAllMessages);
// router.delete('/deleteAllSent', deleteAllSentMessages);
router.get('/api/messages', passport.authenticate('bearer', { session: false }), getUserMessages);



module.exports = router;