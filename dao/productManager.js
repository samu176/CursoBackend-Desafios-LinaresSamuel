const Product = require('../dao/models/productModel');

class ProductManager {
  constructor() {
  }

  async addNewProduct(productData) {
    try {
      const newProduct = await Product.create({
        title: productData.title,
        description: productData.description,
        code: productData.code,
        price: productData.price,
        status: true,
        stock: productData.stock,
        category: productData.category,
        thumbnails: productData.thumbnails || [],
      });

      return newProduct;
    } catch (error) {
      console.error('Error al agregar un nuevo producto:', error.message);
      throw error;
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updatedData },
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error('Producto no encontrado');
      }

      return { message: 'Producto actualizado correctamente' };
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        throw new Error('Producto no encontrado');
      }

      return { message: 'Producto eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
      throw error;
    }
  }

  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error.message);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error.message);
      throw error;
    }
  }
}

module.exports = ProductManager;
