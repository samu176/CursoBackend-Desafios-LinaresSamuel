const Product = require('./models/productModel');

class ProductManager {
  async addNewProduct(productData) {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  }

  async getProducts() {
    const products = await Product.find();
    console.log(products);
    return products;
  }

  async getProductById(productId) {
    const product = await Product.findById(productId);
    return product;
  }

  async updateProduct(productId, updatedProductData) {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );
    return updatedProduct;
  }

  async deleteProduct(productId) {
    const result = await Product.findByIdAndDelete(productId);
    return result;
  }
}

module.exports = ProductManager;
