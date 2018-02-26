var getProductPage = async (ctx, next) => {
    var id = ctx.query.id;
    ctx.render('product.html', {id: id});
};

module.exports = {
    'GET /product': getProductPage
};