var getProductPage = async (ctx, next) => {
    var id = ctx.query.id;
    ctx.response.body = `<h1>Product: ${id}</h1>`;
};

module.exports = {
    'GET /product': getProductPage
};