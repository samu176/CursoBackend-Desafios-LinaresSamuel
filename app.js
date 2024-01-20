const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const productRoutes = require('./router/productRoutes');
const cartRoutes = require('./router/cartRoutes');
const messageRoutes = require('./router/messageRoutes');

const connectionString = 'mongodb+srv://admin:admin@cluster0.afvs2wp.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB Atlas establecida');
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const hbs = exphbs.create({ extname: '.handlebars', layoutsDir: __dirname + '/views/layouts/' });

app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');


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
      io.emit('message', data);
    } catch (error) {
      console.error('Error al procesar el mensaje:', error.message);
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
