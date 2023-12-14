const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.nextId = 1;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const lastProduct = this.products[this.products.length - 1];
                this.nextId = lastProduct.id + 1;
            }
        } catch (error) {
            console.error('Error en leer:', error.message);
        }
    }


    addNewProduct(productData) {
    }

    updateProduct(productId, updatedData) {
    }

    deleteProduct(productId) {
    }
}

module.exports = ProductManager;