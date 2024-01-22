const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const productRoutes = require('./router/productRoutes');
const cartRoutes = require('./router/cartRoutes');
const messageRoutes = require('./router/messageRoutes');
const mongoConnect = require('./db/mongoConnect');
const MessageManager = require('./dao/messageManager');

mongoConnect();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const hbs = exphbs.create({ extname: '.handlebars', layoutsDir: path.join(__dirname, 'views/layouts') });

app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

const messageManager = new MessageManager(io);

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/messages', messageRoutes);

app.get('/chat', (req, res) => {
  res.render('chat');
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('message', async (data) => {
    try {
      messageManager.io.emit('message', data);
    } catch (error) {
      console.error('Error al procesar el mensaje:', error.message);
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
