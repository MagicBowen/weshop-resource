var getProductPage = async (ctx, next) => {
    var id = ctx.query.id;
    ctx.render('product.html', ctx.getProduct(id));
};

module.exports = {
    'GET /product': getProductPage
};