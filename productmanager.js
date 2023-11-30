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

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error en editar:', error.message);
        }
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        const newProduct = {
            id: this.nextId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        this.saveProducts();
        console.log('Producto agregado:', newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log('No encontrado');
            return null;
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
            console.log('Producto actualizado:', this.products[index]);
        } else {
            console.log('Producto no encontrado');
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log('Producto eliminado');
        } else {
            console.log('Producto no encontrado');
        }
    }
}

module.exports = ProductManager;
