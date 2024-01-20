const express = require('express');
const router = express.Router();
const CartManager = require('../dao/cartManager');

const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.addNewCart(req.body);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:cartId', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cartId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:cartId', async (req, res) => {
  try {
    const result = await cartManager.deleteCart(req.params.cartId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:cartId/products', async (req, res) => {
  try {
    const products = await cartManager.getProductsInCart(req.params.cartId);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:cartId/products/:productId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const result = await cartManager.addProductToCart(req.params.cartId, req.params.productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
