const { Message, User } = require("../models");
// Create a new message


const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving all messages', error: err });
    }
};

const createMessage = async (req, res) => {
  try {
    // Find the receiver based on the username
    const receiver = await User.findOne({ where: { username: req.body.username } });
    if (!receiver) {
      return res.status(400).json({ error: 'Receiver not found' });
    }

    // Create the message
    const message = await Message.create({
      sender_id: req.user.id, // Assuming the sender is the currently logged in user
      receiver_id: receiver.id,
      message: req.body.message,
    });

    // Fetch the associated sender and receiver
    await message.reload({
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username'], // Only include id and username fields of the sender
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username'], // Only include id and username fields of the receiver
        },
      ],
    });

    res.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: error.message });
  }
};

const getUserSentMessages = async (req, res) => {
  const userId = req.user.id;

  try {
    const messages = await Message.findAll({
      where: { sender_id: userId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username'], // Only include id and username fields of the sender
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username'], // Only include id and username fields of the receiver
        },
      ],
    });

    res.json(messages);
  } catch (error) {
    console.error('Error getting sent messages:', error);
    res.status(500).json({ error: error.message });
  }
};

const getReceivedMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.findAll({
      where: { receiver_id: userId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username']
        }
      ]
    });

    res.send(messages);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
  
const getUserMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const sentMessages = await Message.findAll({
      where: { sender_id: userId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username']
        }
      ]
    });

    const receivedMessages = await Message.findAll({
      where: { receiver_id: userId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username']
        }
      ]
    });

    res.send({ sent: sentMessages, received: receivedMessages });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUnreadMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({ where: { receiver_id: req.user.id, isRead: false } });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving unread messages', error: err });
    }
};



const markAsRead = async (req, res) => {
    try {
        await Message.update({ isRead: true }, { where: { id: req.params.id } });
        res.json({ message: 'Message marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Error marking message as read', error: err });
    }
};

const deleteMessage = async (req, res) => {
    try {
        await Message.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting message', error: err });
    }
};

const deleteAllMessages = async (req, res) => {
    try {
        await Message.destroy({ where: { receiver_id: req.user.id } });
        res.json({ message: 'All messages deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting all messages', error: err });
    }
};

const deleteAllSentMessages = async (req, res) => {
    try {
        await Message.destroy({ where: { sender_id: req.user.id } });
        res.json({ message: 'All sent messages deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting all sent messages', error: err });
    }
};


module.exports = {
    getAllMessages,
    createMessage,
    getReceivedMessages,
    getUnreadMessages,
    markAsRead, // Add this
    deleteMessage, // Add this
    deleteAllMessages, // Add this
    deleteAllSentMessages,
    getUserMessages,
    getUserSentMessages 

};