const express = require('express');
const ProductManager = require('./productmanager');

const app = express();
const PORT = 8080;

const productManager = new ProductManager('datos.json');

app.get('/api/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        let products = productManager.getProducts();
        if (limit) {
            products = products.slice(0, limit);
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

app.get('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
