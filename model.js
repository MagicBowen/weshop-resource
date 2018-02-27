const fs = require('fs');

function loadProducts(path) {
    var result = JSON.parse(fs.readFileSync(`${path}/products.json`));
    result.products.forEach(product => {
        product.pictures.forEach(pic => {
            pic.url = `static/pictures/products/${product.id}/${pic.name}`;
        })
    });
    return result.products;
}

function fetchModel(path) {
    var products = loadProducts(path);
    return async (ctx, next) => {
        ctx.getProduct = function (id) {
            for(i in products) {
                if (products[i].id === id) {
                    return products[i];
                }
            }
            return null;
        };
        await next();
    };
}

module.exports = fetchModel;