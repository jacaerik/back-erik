// DESAFIO => Class ProductManager
class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let product = this.products.find((prod) => prod.id == id);
    if (product) {
      return product;
    } else {
      console.error(`Not found: El producto con id '${id}' no se encuentra.`);
      return null;
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!this.products.find((prod) => prod.code === code)) {
      if (title && description && price && thumbnail && code && stock) {
        let product = {
          id: Date.now(),
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        };
        this.products.push(product);
      } else {
        console.error(
          "Todos los campos son obligatorios, producto no agregado."
        );
      }
    } else {
      console.error(
        `El producto con código '${code}' ya existe... Producto no agregado.`
      );
    }
  }
}

// TESTING
console.log("Prueba 1: Creando instancia de ProductManager...");
let prodmgr = new ProductManager();

console.log("Prueba 2: Listando productos (incial) ->");
console.log(prodmgr.getProducts());

console.log(
  "Prueba 3: Agregando producto de prueba, se genera ID automático que no se repite"
);
prodmgr.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(
  "Prueba 4: Listando productos (ahora aparece el recién generado) ->"
);
console.log(prodmgr.getProducts());

console.log("Prueba 5: Agregando producto de prueba (duplicado)");
prodmgr.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log("Prueba 6: Buscando por id (producto existente)");
console.log(prodmgr.getProductById(prodmgr.getProducts()[0].id));

console.log("Prueba 6: Buscando por id (inexistente)");
console.log(prodmgr.getProductById(1234567890));
