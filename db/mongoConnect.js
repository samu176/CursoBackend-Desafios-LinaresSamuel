const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.afvs2wp.mongodb.net/ecommerce?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Conexión a MongoDB Atlas establecida');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
  }
};

module.exports = mongoConnect;
