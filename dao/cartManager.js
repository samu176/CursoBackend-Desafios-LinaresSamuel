const Cart = require('./models/cartModel'); 

class CartManager {
  constructor() {}

  async addNewCart(cartData) {
    try {
      const newCart = await Cart.create({
        products: cartData.products || []
      });

      return newCart;
    } catch (error) {
      throw new Error('Error al agregar un nuevo carrito');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      return cart;
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  async deleteCart(cartId) {
    try {
      const result = await Cart.findByIdAndDelete(cartId);

      if (result) {
        return { message: 'Carrito eliminado correctamente' };
      } else {
        throw new Error('Carrito no encontrado');
      }
    } catch (error) {
      throw new Error('Error al eliminar el carrito');
    }
  }

  async getProductsInCart(cartId) {
    try {
      const cart = await Cart.findById(cartId);

      if (cart) {
        return cart.products;
      } else {
        throw new Error('Carrito no encontrado');
      }
    } catch (error) {
      throw new Error('Error al obtener los productos del carrito');
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);

      if (cart) {
        const existingProduct = cart.products.find(product => product.productId.toString() === productId);

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({
            productId: productId,
            quantity: quantity
          });
        }

        await cart.save();

        return { message: 'Producto agregado al carrito correctamente' };
      } else {
        throw new Error('Carrito no encontrado');
      }
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }
}

module.exports = CartManager;
