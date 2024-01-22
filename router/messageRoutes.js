const express = require('express');
const router = express.Router();
const MessageManager = require('../dao/messageManager');

const messageManager = new MessageManager();

router.get('/', async (req, res) => {
  try {
    const messages = await messageManager.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Received message data:', req.body);
    const newMessage = await messageManager.addNewMessage(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:messageId', async (req, res) => {
  try {
    const updatedMessage = await messageManager.updateMessage(req.params.messageId, req.body);
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:messageId', async (req, res) => {
  try {
    const result = await messageManager.deleteMessage(req.params.messageId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;