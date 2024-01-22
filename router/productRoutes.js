const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/productManager');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const newProduct = await productManager.addNewProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.put('/:productId', async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.productId, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:productId', async (req, res) => {
  try {
    const result = await productManager.deleteProduct(req.params.productId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
