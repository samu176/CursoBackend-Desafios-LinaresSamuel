const Message = require('./models/messageModel');

class MessageManager {
  constructor(io) {
    this.io = io;
  }

  async addNewMessage(userData) {
    try {
      console.log('Received message data:', userData);
      const newMessage = await Message.create({
        user: userData.user,
        message: userData.message
      });

      this.io.emit('message', { user: userData.user, message: userData.message });

      return newMessage;
    } catch (error) {
      console.error('Error al agregar un nuevo mensaje:', error.message);
      throw new Error('Error al agregar un nuevo mensaje');
    }
  }

  async getMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      console.error('Error al obtener los mensajes:', error.message);
      throw new Error('Error al obtener los mensajes');
    }
  }

  async updateMessage(messageId, updatedData) {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { $set: updatedData },
        { new: true }
      );

      if (!updatedMessage) {
        throw new Error('Mensaje no encontrado');
      }

      return { message: 'Mensaje actualizado correctamente' };
    } catch (error) {
      console.error('Error al actualizar el mensaje:', error.message);
      throw new Error('Error al actualizar el mensaje');
    }
  }

  async deleteMessage(messageId) {
    try {
      const deletedMessage = await Message.findByIdAndDelete(messageId);

      if (!deletedMessage) {
        throw new Error('Mensaje no encontrado');
      }

      return { message: 'Mensaje eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error.message);
      throw new Error('Error al eliminar el mensaje');
    }
  }
}

module.exports = MessageManager;