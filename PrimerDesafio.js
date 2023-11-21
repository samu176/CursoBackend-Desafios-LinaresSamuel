class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
         console.log("Ese codigo ya existe");
        return;
        }

        const newProduct = { id: this.nextId++, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        console.log("Producto agregado:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
        console.log("No encontrado");
        return;
        }
        return product;
    }
}
