const express = require('express');
const router = express.Router();
const MessageManager = require('../dao/messageManager');

module.exports = function(io) { 
  const messageManager = new MessageManager(io);

  router.get('/', async (req, res) => {
    try {
      const messages = await messageManager.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
