const Message = require('./models/messageModel');

class MessageManager {
    constructor(io) {
      this.io = io;
    }
    
  async addNewMessage(userData) {
    try {
      const newMessage = await Message.create({
        user: userData.user,
        message: userData.message
      });

      io.emit('message', { user: userData.user, message: userData.message });

      return newMessage;
    } catch (error) {
      throw new Error('Error al agregar un nuevo mensaje');
    }
  }

  async getMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      throw new Error('Error al obtener los mensajes');
    }
  }
}

module.exports = MessageManager;

