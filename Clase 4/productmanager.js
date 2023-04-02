// DESAFIO => FileSystem
const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        fs.existsSync(this.path) ? this._read() : this._write()
    }

    _read () {
        this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
    }

    _write () {
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        let product = this.products.find(prod => prod.id == id)
        if (product) {
            return product
        } else {
            console.error(`El producto con id '${id}' no se encuentra.`)
            return null
        }
    }

    addProduct (product) {
        if (!this.products.find(prod => prod.code === product.code)) {
            if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
                product.id = Date.now()
                this.products.push(product)
                this._write()
                return product.id
            } else {
                console.error('Todos los campos son obligatorios, producto no agregado.')
            }
        } else {
            console.error(`El producto con código '${product.code}' ya existe... Producto no agregado.`)
        }
    }

    updateProduct (id, updatedPrd) {
        let productIdx = this.products.findIndex(product => product.id === id)
        for (const property in updatedPrd) {
            if (this.products[productIdx][property]) {
                this.products[productIdx][property] = updatedPrd[property]
                this._write()
            } else {
                console.error(`El valor ${property} no existe no se actualizará en el producto...`)
            }
        }
    }

    deleteProduct (id) {
        if (this.getProductById(id)) {
            this.products = this.products.filter(product => product.id !== id)
            this._write()
        }
    }
}

// TESTING
console.log('1 -> Instanciando ProductManager, pasando como parámetro la ruta de la base de datos...')
const prodmgr = new ProductManager('data/db.json')

console.log('2 -> Se llama getProducts y devuelve array vacío...')
console.log(prodmgr.getProducts())

console.log('3 -> Se llama el método addProduct')
const productId = prodmgr.addProduct({title: 'producto de prueba', description: 'Este es un producto de prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25})

console.log('4 -> Se llama getProducts y aparece el item recién agregado')
console.log(prodmgr.getProducts())

console.log('5 -> Se llama getProductById consultando el id recientemente generado, debe retornar el producto')
console.log(prodmgr.getProductById(productId))

console.log('5 -> Se llama getProductById consultando un id inexistente, debe retornar error')
prodmgr.getProductById(1000000000000)

console.log('6 -> Se llama updateProduct cambiando el título')
prodmgr.updateProduct(productId, {title: 'Este es un titulo actualizado'})

console.log(`6 -> Se verifica que el id no cambio mostrando el producto actualizado por su ID ${productId}`)
console.log(prodmgr.getProductById(productId))

console.log('7 -> Se llama deleteProduct eliminando el producto creado y dejando la base vacía nuevamente...')
prodmgr.deleteProduct(productId)

console.log('7 -> Se llama deleteProduct eliminando el producto nuevamente, como ya no existe debe dar error...')
prodmgr.deleteProduct(productId)